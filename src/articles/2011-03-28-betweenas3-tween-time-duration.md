# <span>BetweenAS3の</span><span>トゥイーンの再生時間を調べる</span>

単にBetweenAS3#durationメソッドの存在に今日気づいたというだけの話なんだけども。これに気づくまで、TweenEvent.COMPLETEとTimerとか使って時間測ってたはずかし。

<!-- READMORE -->

## durationメソッド

この`duration`メソッドが、`ITween`オブジェクトの再生時間を返してくれる。`FLVPlayback`クラスで言うところの[`totalTime`](http://livedocs.adobe.com/flash/9.0_jp/ActionScriptLangRefV3/fl/video/FLVPlayback.html)メソッドに相当するやつ。

*再生終了5秒前にこのオブジェクトをこっちにトゥイーンさせる*とか、*再生終了1秒前にBGMをフェードアウトさせる*なんてことをするときには、これがないと話にならないんだけど、最近まで`duration`メソッドの存在を知らなくて、`parallel`や`serial`をネストしまくったトゥイーンの秒数を手動で計算してた…。

~~~ actionscript
package 
{
    import flash.display.Sprite;
    import flash.events.Event;
    import org.libspark.betweenas3.BetweenAS3;
    import org.libspark.betweenas3.tweens.ITween;
    
    public class Main extends Sprite 
    {
        public function Main():void 
        {
            var sp:Sprite = new Sprite();
            sp.graphics.beginFill(0x0);
            sp.graphics.drawCircle(100, 100, 100);
            sp.graphics.endFill();
            
            addChild(sp);
            
            var it:ITween = BetweenAS3.serial(
                                BetweenAS3.delay(BetweenAS3.tween(sp, { $x:200 }, null, 3), 3, 3),
                                BetweenAS3.tween(sp, { $x:200 }, null, 3),
                                BetweenAS3.parallel(
                                    BetweenAS3.tween(sp, { $x:200 }, null, 3),
                                    BetweenAS3.tween(sp, { $x:200 }, null, 3)
                                    )
                            );
                            
            trace(it.duration); //=> 15秒
        }
    }
}
~~~

---

<cite>[BetweenAS3/en - Spark project](http://www.libspark.org/wiki/BetweenAS3/en)</cite>
