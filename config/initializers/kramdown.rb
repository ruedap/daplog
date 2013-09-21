module Kramdown
  module Converter
    class HtmlWithRouge < Html
      def convert_codeblock(el, indent)
        attr = el.attr.dup
        lang = extract_code_language!(attr)

        begin
          Rouge.highlight(el.value, lang || 'text', 'html')
        rescue RuntimeError, 'unknown lexer'
          # 対応する拡張子(lexer)が存在しなかったらtextタイプに変更して再出力
          # github.com/vmg/redcarpet/blob/master/lib/redcarpet/render_man.rb#L9
          Rouge.highlight(el.value, 'text', 'html')
        end
      end
    end
  end
end
