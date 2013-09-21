module SassCustomFunctions

  # Public: 記事一覧のグラデーション表現に必要な数値を返します。
  # 数値の内容は、データベース内の記事の数と西暦の種類の数を足したものです。
  # デプロイ時のデータベースの状態から数値を割り出すため、現在の仕様である
  # デプロイ後にデータベースを再構築する(`rake redis:rebuild`)場合では、
  # 厳密には正確な数値ではありません。例えば、1記事を追加したデプロイであれば、
  # デプロイかつ再構築後の総数より、1少ない数値になります。
  #
  # 数値をSass::Script::Numberで返します。
  def gradient_size
    articles = Article.all
    size = articles.size
    size += articles.all.map { |a| a.published_at.year }.uniq.size
    Sass::Script::Number.new(size)
  end
end

module Sass::Script::Functions
  include SassCustomFunctions
end
