atom_feed(language: 'ja-JP') do |feed|
  feed.title    blog_title
  feed.subtitle blog_description
  feed.updated  Time.now
  feed.author { |author| author.name(blog_author) }

  @recent_articles.each do |article|
    feed.entry(article,
               url:       article.url(root_url),
               id:        article.url(root_url),
               published: article.published_at.to_datetime,
               updated:   article.published_at.to_datetime
              ) do |item|
      item.title(article_title(article))
      item.content(article.body, type: 'html')
      item.author { |author| author.name(blog_author) }
    end
  end
end
