---
layout: article
title: "RailsのActionMailerを使ってメールを送信する"
date: 2010-10-18
comments: true
categories: ruby
tags: ruby
published: true
---

Rails 2.3.5でとりあえず送信はできたのでメモっとく。

<!-- READMORE -->

~~~ ruby
require 'rubygems'
require 'action_mailer'
class HogeMailer < ActionMailer::Base
  def hoge_message(to_address, my_subject, my_body)
    from 'fromのメールアドレス'
    recipients to_address
    subject my_subject
    body my_body
  end
end
ActionMailer::Base.smtp_settings = { :address => 'SMTPサーバー',
                                     :port => 'ポート番号',
                                     :domain => 'メールサーバーのドメイン名？',
                                     :user_name => 'ユーザー名',
                                     :password => 'パスワード',
                                     :authentication => :login }
HogeMailer.deliver_hoge_message("宛先のメールアドレス", "メールの題名", "メールの本文")
~~~

* * *

<cite>[Rubyからメールを送信する方法 - エンジニアの低脳っぷりを晒す戦記](http://d.hatena.ne.jp/GegegeMokeke/20070601)</cite>
