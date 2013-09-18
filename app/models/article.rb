class Article
  include Redis::Objects
  include DataMapper::Resource

  # datamapper fields, just used for .create
  property :id, Serial
  property :body, Text
  property :url, String
  property :path, String
  property :title, String
  property :published_at, DateTime

  # use redis-objects fields for everything else
  counter :view_count, start: 0  # TODO

  # Public: 選択されているRedis DBの全データを消去します。
  #
  # 実行結果をStringで返します。
  def self.flushdb!
    redis.flushdb
  end

  # Public: Markdownファイルの記事内容を読み込みます。
  #
  # 読み込んだ記事データを含んだArticleオブジェクトを返します。
  def self.load_article(path)
    article = Article.create
    markdown = parse_front_matter(load_file(path))
    front_matter = markdown.first
    article.body         = parse_markdown(markdown.last)
    article.title        = front_matter['title']
    article.url          = parse_article_url(path)
    article.path         = parse_article_path(path)
    article.published_at = parse_article_date(path)
    article.save
    article
  end

  # Public: 選択されているRedis DBの全データを消去した上で、全記事のデータを
  # 再読込みします。
  #
  # 戻り値はありません。
  def self.rebuild!
    flushdb!
    load_articles
  end

  # Public: 日付の降順に並べ替えて全記事を返します。
  #
  # 全記事を含むDataMapper::Collectionを返します。
  def self.index
    Article.all(order: [:published_at.desc])
  end

  # Public: 年月日をドット区切りのフォーマットに変換して返します。
  #
  # 日付のStringを返します。
  def date
    self.published_at.iso8601.gsub('-', '.')[0..9]
  end

  private

  # Private: Markdownファイルの内容を読み込んで全記事のデータを
  # Redisのarticlesキーに保存します。
  #
  # 戻り値はありません。
  def self.load_articles
    path = "#{Rails.root}/app/articles/*.md"
    Dir.glob(path).each { |p| load_article(p) }
  end

  def self.load_file(path)
    File.open(path) {|f| f.read }
  end

  def self.parse_front_matter(markdown)
    RubyFrontMatter::Parser.new.parse(markdown)
  end

  def self.parse_markdown(markdown)
    options = { auto_ids: false,
                coderay_css: :class,
                coderay_line_numbers: nil,
                coderay_wrap: :div }
    Kramdown::Document.new(markdown, options).to_html
  end

  def self.parse_article_url(path)
    md = parse_path(path)
    "#{md[1]}/#{md[2]}/#{md[3]}/#{md[4]}"
  end

  def self.parse_article_path(path)
    md = parse_path(path)
    "#{md[1]}-#{md[2]}-#{md[3]}-#{md[4]}"
  end

  def self.parse_article_date(path)
    md = parse_path(path)
    DateTime.new(md[1].to_i, md[2].to_i, md[3].to_i)
  end

  def self.parse_path(path)
    /\/(20\d{2})-([01]\d)-([0-3]\d)-(.+)\.md/.match(path)
  end

  def self.redis_set(key, value)
    redis.set(key, value.to_json)
    redis.expire(key, 10.seconds) if Rails.env.development?
  end
end
