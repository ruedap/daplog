class Article
  include Redis::Objects
  include DataMapper::Resource

  GLOB_PATH = "#{Rails.root}/app/articles/*.md"

  # datamapper fields, just used for .create
  # TODO: バリデーション
  property :id, Serial
  property :url, String
  property :title, String
  property :filename, String
  property :published_at, DateTime

  # use redis-objects fields for everything else
  counter :view_count, start: 0  # TODO
  value :body_text

  # Public: 選択されているRedis DBの全データを消去します。
  #
  # 実行結果をStringで返します。
  def self.flushdb!
    redis.flushdb
  end

  # Public: Markdownファイルの記事内容を読み込みます。
  #
  # 読み込んだ記事データを含んだArticleオブジェクトを返します。
  def self.create_article(path)
    article = Article.create
    markdown = parse_markdown(load_file(path))
    article.body         = parse_article_body(markdown)
    article.title        = parse_article_title(markdown)
    article.url          = parse_article_url(path)
    article.filename     = parse_article_filename(path)
    article.published_at = parse_article_date(path)
    article.save
    article
  rescue Errno::ENOENT
    nil
  end

  # Public: 選択されているRedis DBの全データを消去した上で、全記事のデータを
  # 再読込みします。
  #
  # 実行結果をIntegerまたはStringで返します。
  def self.rebuild!
    str = flushdb!
    articles = create_articles
    (str == 'OK' && articles.present?) ? articles.size : 'NG'
  end

  # Public: 日付の降順に並べ替えて全記事を返します。
  #
  # 全記事を含むDataMapper::Collectionを返します。
  def self.index
    Article.all(order: [:published_at.desc])
  end

  # Public: ローカルから取得した全記事の西暦部分のみを返します。
  #
  # 全記事の西暦部分のみをArrayで返します。
  def self.glob_article_years
    Dir.glob(GLOB_PATH).map { |p| /(\d{4})-\d{2}-\d{2}-/.match(p)[1] }.compact
  end

  # Public: 年月日をドット区切りのフォーマットに変換して返します。
  #
  # 日付のStringを返します。
  def date
    self.published_at.iso8601.gsub('-', '.')[0..9]
  end

  # Public: 記事のURLを返します。引数にroot_urlがある場合はフルパスのURLを
  # 返します。
  #
  # root_url - ルートURLのString。
  #
  # URLのStringを返します。
  def url(root_url = nil)
    return self[:url] unless root_url
    "#{root_url}#{self[:url]}"
  end

  # Public: 記事の本文を返します。
  #
  # 本文のStringまたはnilを返します。
  def body
    self.body_text.try(:value)
  end

  # Public: 記事の本文を代入します。
  #
  # 本文のStringを返します。
  def body=(arg)
    self.body_text = arg
  end

  private

  # Private: Markdownファイルの内容を読み込んで全記事のデータを
  # Redisのarticlesキーに保存します。
  #
  # 全記事データのArticleオブジェクトを含んだArrayを返します。
  def self.create_articles
    Dir.glob(GLOB_PATH).sort.map { |p| create_article(p) }
  end

  def self.load_file(path)
    File.open(path) {|f| f.read }
  end

  def self.parse_markdown(text)
    options = { auto_ids: false,
                enable_coderay: false }
    Kramdown::Document.new(text, options).to_html_with_rouge
  end

  # TODO
  def self.parse_article_body(markdown)
    markdown
  end

  # TODO
  def self.parse_article_title(markdown)
    markdown.lines.first
  end

  def self.parse_article_url(path)
    build_pathname(path, '/')
  end

  def self.parse_article_filename(path)
    build_pathname(path, '-')
  end

  def self.build_pathname(path, sep)
    md = parse_path(path)
    "#{md[1]}#{sep}#{md[2]}#{sep}#{md[3]}#{sep}#{md[4]}"
  end

  def self.parse_article_date(path)
    md = parse_path(path)
    DateTime.new(md[1].to_i, md[2].to_i, md[3].to_i)
  end

  def self.parse_path(path)
    /\/(20\d{2})-([01]\d)-([0-3]\d)-(.+)\.md/.match(path)
  end
end
