module ArticlesHelper
  def article_list(articles)
    content_tag :ul, class: 'ArticleList' do
      article_year = ''
      articles.each do |a|
        path = a.url
        year = a.date[0..3]
        html = ''
        unless article_year == year
          article_year = year
          html << content_tag(:li, article_year, class: 'ArticleList-item ArticleList-yearHeading')
        end
        html << content_tag(:li, class: 'ArticleList-item') do
          title = generate_time_tag(a)
          title << ' '
          title << content_tag(:span, strip_tags(a.title), class: 'ArtcileList-title u-textTruncate')
          link_to(title, path, class: 'ArticleList-itemLink')
        end
        concat html.html_safe
      end
    end
  end

  def generate_time_tag(article)
    year = article.date[0..3]
    month = article.date[5..6]
    day = article.date[8..9]
    html = content_tag(:span, year, class: 'ArticleList-year')
    html << content_tag(:span, '.', class: 'ArticleList-dot')
    html << content_tag(:span, month, class: 'ArticleList-month')
    html << content_tag(:span, '.', class: 'ArticleList-dot')
    html << content_tag(:span, day, class: 'ArticleList-day')
    content_tag(:time, html, datetime: article.published_at, class: 'ArticleList-time')
  end

  def article_title(article)
    if article.present?
      strip_tags(article.title)
    else
      nil
    end
  end

  def article_body(article)
    if article.present?
      article.body
    else
      nil
    end
  end
end
