# AS3でBulkLoaderを使うときの最小構成

最近AS3を使うことが稀になってるんだけど、使うときにたまに[BulkLoader](http://code.google.com/p/bulk-loader/)を使う。で、使うたびに使い方をググってるので、よく使う`swf`, `png`, `txt`, `mp3`あたりを読み込む最小コードをメモっておく。コピペ用。

<!-- READMORE -->

## BulkLoaderのよく使う最小構成

~~~ actionscript
package 
{
	import br.com.stimuli.loading.BulkLoader;
	import flash.display.Bitmap;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.media.Sound;
	
	public class Main extends Sprite 
	{
		public function Main():void 
		{
			var bulk:BulkLoader = new BulkLoader("main");
			bulk.addEventListener(BulkLoader.COMPLETE, _bulkLoaderCompleteHandler);
			bulk.add("hoge.swf");
			bulk.add("fuga.png");
			bulk.add("piyo.txt");
			bulk.add("poyo.mp3");
			bulk.start();
		}
		
		private function _bulkLoaderCompleteHandler(event:Event):void 
		{
			event.target.removeEventListener(event.type, arguments.callee);
			
			var hoge:MovieClip = event.target.getMovieClip("hoge.swf");
			var fuga:Bitmap    = event.target.getBitmap("fuga.png");
			var piyo:String    = event.target.getText("piyo.txt");
			var poyo:Sound     = event.target.getSound("poyo.mp3");
		}
	}
}
~~~

---

<cite>[GettingStarted - bulk-loader - quick and dirty how to - A library for managing multiple loadings with Actionscript 3 (AS3). - Google Project Hosting](http://code.google.com/p/bulk-loader/wiki/GettingStarted)</cite>
