module Sass::Script::Functions
  module CustomFunctions
    def gradient_count
      path = "#{Rails.root}/app/articles/*.md"
      articles = []
      Dir.glob(path).each do |p|
        md = /(\d{4})-\d{2}-\d{2}-/.match(p)  # 年の部分だけ抽出
        articles << md[1]
      end
      size = articles.size        # 記事の数
      size += articles.uniq.size  # 年の数
      Sass::Script::Number.new(size)
    end
  end

  include CustomFunctions
end
