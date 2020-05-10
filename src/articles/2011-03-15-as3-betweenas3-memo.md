# AS3でBetweenAS3を使うときの備忘録

備忘録。たいしたことは書いてない。100から先は覚えてない。最近AS3をそれなりに書いてる。かなり忘れかけている。`ITween`を使うことと、基本的に何やるにしてもクラスメソッドなことがポイントだろうか。`delay`, `serial`, `parallel`が便利。後述のプレゼン資料がとても良くまとまっている。

<!-- READMORE -->

## 備忘録

このままでは動かないけど、これっぽい使い方をしたというメモでしか無い。意味ナッシン。次使うときの自分用。

~~~ actionscript
package 
{
	import flash.display.Sprite;
	import flash.events.Event;
	import org.libspark.betweenas3.BetweenAS3;
	import org.libspark.betweenas3.easing.Expo;
	import org.libspark.betweenas3.events.TweenEvent;
	import org.libspark.betweenas3.tweens.ITween;
	public class Main extends Sprite 
	{
		public function Main():void 
		{
			var it:ITween = BetweenAS3.tween(target, { x:100, y:100, alpha:1 }, null, 1.0, Expo.easeOut);
			it.addEventListener(TweenEvent.COMPLETE, _tweenCompleteHandler);
			it.play();
		}
		
		private function _tweenCompleteHandler(event:TweenEvent):void 
		{
			BetweenAS3.serial(
				BetweenAS3.delay(BetweenAS3.tween(target1, { y:100, alpha:1 }, null, 0.5), 9.5),
				BetweenAS3.parallel(
					BetweenAS3.delay(BetweenAS3.tween(target1, { alpha:0 }, null, 0.5), 8.0),
					BetweenAS3.delay(BetweenAS3.tween(target2, { alpha:0 }, null, 0.5), 8.0),
					BetweenAS3.delay(BetweenAS3.tween(target3, { alpha:0 }, null, 0.5), 8.0)
				)
			).play();
		}
	}
}
~~~

---

<cite>[Flashup 第7回 発表資料 「ライブラリを使ってみよう。BetweenAS3入門」 &#171; orange-suzuki blog](http://orange-suzuki.com/blog/2011/01/flashup7_report/)</cite>
