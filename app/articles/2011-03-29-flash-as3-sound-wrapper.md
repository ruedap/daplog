---
layout: article
title: "<span>AS3でサウンドを簡単に扱うための</span>Soundラッパークラス"
date: 2011-03-29
comments: true
categories: as3
tags: as3
published: true
---

AS3でサウンドを扱う場合、Sound、SoundChannel、SoundTransformなどやたらクラスが多くて結構ややこしい。んで、[こちらの記事](http://level0.kayac.com/2009/01/post_10.php)に載っているサウンドを簡単に扱うためのラッパークラスが結構便利なのでたまに使っていたんだけど、そのまま使うとFlex SDKでは警告が出まくるので直したり、使っているうちに足りない機能を付け足したりしていたので、その自分用のSoundWrapperクラスを備忘録。


## SoundWrapperクラス

基本機能は元ネタの記事まんまなんだけど、まずFlex SDKなどの型指定が厳格にチェックされるコンパイラで警告が出ないように修正した。それから以下の機能を追加したり、仕様を変更したりした。

- サウンド再生完了のイベントディスパッチを追加
- サウンドのボリュームをゼロにしても停止しないように変更
- 再生時間を取得するtotalTimeプロパティを追加

あとメソッド名や変数名を結構自分好みに変えてある。

~~~ actionscript
package
{
    import flash.events.Event;
    import flash.events.EventDispatcher;
    import flash.events.TimerEvent;
    import flash.media.Sound;
    import flash.media.SoundChannel;
    import flash.media.SoundTransform;
    import flash.utils.Timer;
    public class SoundWrapper extends EventDispatcher
    {
        public static const COMPLETE:String = "SoundWrapper.COMPLETE";
        private var _volume:Number = 100;
        private var _fadeCount:int = 0;
        private var _loopCount:int = 1;
        private var _targetVolume:int;
        private var _sound:Sound
        private var _soundChannel:SoundChannel;
        private var _soundTransform:SoundTransform = new SoundTransform();
        public function SoundWrapper(sound:Sound)
        {
            _sound = sound;
        }
        
        public function get volume():Number { return _volume; }
        
        /**
         *  @param    vol    The volume, ranging from 0 (silent) to 100 (full volume).
         */
        public function set volume(vol:Number):void 
        {
            _volume = vol;
            if (_soundChannel != null)
            {
                _soundTransform.volume = vol / 100;
                _soundChannel.soundTransform = _soundTransform;
            }
        }
        
        /**
         *  @return    seconds.
         */
        public function get totalTime():Number
        {
            if (_sound) 
            {
                return (_sound.length / 1000) * _loopCount;
            }
            else 
            {
                return 0;
            }
        }
        
        public function play():void
        {
            _play();
        }
        
        public function loop(count:uint):void
        {
            if (count == 0) { count = 9999; }
            _play(count);
        }
        
        public function stop():void
        {
            if (_soundChannel != null)
            {
                _soundChannel.stop();
            }
        }
        
        public function fade(vol:Number, sec:Number):void
        {
            if (_soundChannel != null)
            {
                _targetVolume = vol;
                _fadeCount = 0;
                var timer:Timer = new Timer(sec * 1000 / 10, 10);
                timer.addEventListener(TimerEvent.TIMER, _fadeTimerHandler);
                timer.addEventListener(TimerEvent.TIMER_COMPLETE, _fadeTimerCompleteHandler);
                timer.start();
            }
        }
        
        private function _play(count:uint = 1):void 
        {
            _loopCount = count;
            _soundTransform.volume = _volume / 100;
            _soundChannel = _sound.play(0, count, _soundTransform);
            _soundChannel.addEventListener(Event.SOUND_COMPLETE, _soundCompleteHandler);
        }
        
        private function _soundCompleteHandler(event:Event):void 
        {
            event.target.removeEventListener(event.type, arguments.callee);
            dispatchEvent(new Event(COMPLETE));
        }
        
        private function _fadeTimerHandler(event:TimerEvent):void
        {
            _fadeCount++;
            var v:Number = _fadeCount / 10 * (_targetVolume - _volume) + _volume;
            _soundTransform.volume = v / 100;
            _soundChannel.soundTransform = _soundTransform;
        }
        
        private function _fadeTimerCompleteHandler(event:TimerEvent):void
        {
            volume = _targetVolume;
            event.target.stop();
        }
    }
}
~~~


## 使い方
使い方はこんな感じ。フェードがあまりキレイじゃないので改善したいんだけど、良い実装方法がわからんので手をつけてない。

~~~ actionscript
package 
{
    import br.com.stimuli.loading.BulkLoader;
    import flash.display.Sprite;
    import flash.events.Event;
    import flash.events.TimerEvent;
    import flash.media.Sound;
    import flash.utils.Timer;
    
    public class Main extends Sprite 
    {
        private var _sw:SoundWrapper;  // 対象のSoundオブジェクトをラップしたSoundWrapper
        
        public function Main():void 
        {
            var b:BulkLoader = new BulkLoader("main");
            b.addEventListener(BulkLoader.COMPLETE, _bulkLoaderCompleteHandler);
            b.add("hoge.mp3", { id:"hoge" } );
            b.start();
        }
        
        private function _bulkLoaderCompleteHandler(event:Event):void 
        {
            event.target.removeEventListener(event.type, arguments.callee);
            
            var h:Sound = event.target.getSound("hoge");
            _sw = new SoundWrapper(h);
            
            _sw.addEventListener(SoundWrapper.COMPLETE, _hogePlayCompleteHandler);  // サウンドの再生完了のイベントを捕捉
            _sw.play();  // サウンドを再生
            
            trace(_sw.totalTime);  // サウンドの秒数を表示
            
            var t:Timer = new Timer((_sw.totalTime - 3) * 1000, 1);
            t.addEventListener(TimerEvent.TIMER_COMPLETE, function (e:Event):void {
                e.target.removeEventListener(e.type, arguments.callee);
                _sw.fade(0, 2);  // サウンドの再生終了3秒前から、2秒かけてボリュームを0%にフェード
            } );
            t.start();
        }
        
        private function _hogePlayCompleteHandler(event:Event):void 
        {
            event.target.removeEventListener(event.type, arguments.callee);
            
            _sw.addEventListener(SoundWrapper.COMPLETE, _hogeLoopCompleteHandler);  // サウンドのループ再生完了のイベントを捕捉
            _sw.volume = 50;  // サウンドのボリュームを50%に設定
            _sw.loop(3);  // サウンドを3回ループ再生
            _sw.fade(90, 5);  // サウンドの再生開始時から、5秒かけてボリュームを90%にフェード
            
            trace(_sw.totalTime);  // サウンド（ループ回数合計分）の秒数を表示
        }
        
        private function _hogeLoopCompleteHandler(event:Event):void 
        {
            trace(_sw.volume);  // ボリュームは最後に設定した値になるので90
        }
    }
}
~~~

ところで、はてダの[ASのシンタックスハイライト](http://hatenadiary.g.hatena.ne.jp/keyword/%E3%82%BD%E3%83%BC%E3%82%B9%E3%82%B3%E3%83%BC%E3%83%89%E3%82%92%E8%89%B2%E4%BB%98%E3%81%91%E3%81%97%E3%81%A6%E8%A8%98%E8%BF%B0%E3%81%99%E3%82%8B%EF%BC%88%E3%82%B7%E3%83%B3%E3%82%BF%E3%83%83%E3%82%AF%E3%82%B9%E3%83%BB%E3%83%8F%E3%82%A4%E3%83%A9%E3%82%A4%E3%83%88%EF%BC%89)ってなんかおかしい。もしかしてAS2? でもないような・・・。

* * *

<cite>[サウンドまわりの扱いがめんどくさいので。 \| エントリー \| _level0.KAYAC \| flash ActionScript blog](http://level0.kayac.com/2009/01/post_10.php)</cite>
