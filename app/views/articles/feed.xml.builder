atom_feed(language: 'ja-JP') do |feed|
  feed.title    blog_title
  feed.subtitle blog_description
  feed.updated  Time.now
  feed.author { |author| author.name(blog_author) }

  @recent_entries.each do |article|
    feed.entry(article,
               url:       article[:url],
               id:        article[:url],
               published: article[:time].to_datetime,
               updated:   article[:time].to_datetime
              ) do |item|
      item.title(strip_tags(article[:title]))
      item.content(article[:body], type: 'html')
      item.author { |author| author.name(blog_author) }
    end
  end
end
