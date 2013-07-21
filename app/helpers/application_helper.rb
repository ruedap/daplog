module ApplicationHelper
  def blog_title(article_title = nil)
    if article_title.present?
      "#{article_title} - #{blog_name}"
    else
      blog_name
    end
  end

  def blog_description(description = nil)
    if description
      truncate(strip_tags(description).strip.gsub(/\n/, ''), length: 130)
    else
      'できればググってもでてこないようなことだけをかきたいけれど'
    end
  end

  def blog_author
    'ruedap'
  end

  def blog_ogp_image
    image_url("ogp-#{@hue}.png")
  end

  private

  def blog_name
    'アインシュタインの電話番号'
  end
end
