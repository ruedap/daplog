module ApplicationHelper
  def blog_name
    'アインシュタインの電話番号'
  end

  def blog_title(article_title = nil)
    if article_title
      "#{article_title} - #{blog_name}"
    else
      blog_name
    end
  end
end
