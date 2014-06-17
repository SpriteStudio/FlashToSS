==============================================================================

  Flash To SS

  Flash Exporter Plugin for OPTPiX SpriteStudio

  Copyright(C) Web Technology Corp.

==============================================================================

------------------------------------------------------------------------------
# 更新履歴

1.0.0 (2013/9/26)
  初回リリース

------------------------------------------------------------------------------
# 動作環境

動作確認を行った環境：

- Windows 7 64bit / MacOSX 10.7.5 Lion

- Flash CS6/CC

------------------------------------------------------------------------------
# 使い方

jsfl を実行するために Flash がインストールされている必要があります。

jsflと同一階層に、コンバートしたいflaファイルをコピーし、Main.jsflを実行してください。

表示されるダイアログボックスに、コピーしたflaファイル名を入力してOKを押すと、
OPTPiX SpriteStudio(以降SS) ファイル一式にコンバートします。

------------------------------------------------------------------------------
# ご注意

SS と Flash にはデータ構造、ツールの仕様において異なる点が多くあります。

そのためコンバートができないFlash の機能・仕様や、コンバートを可能にするための
修正方法について後にまとめました。
コンバーターを利用して頂く前に是非ご一読ください。

※以降の「Flash」とは特に明記しない限り「FlashLite1.1」を指します。

------------------------------------------------------------------------------
# コンバーターの仕様と制限事項

## コンバーター仕様
----------------------------------------------------------------------------
- 原則としてFlashLite1.1に準拠
- シンボルの最下層は、１フレーム１レイヤー、重なり無しのBitmap画像（pngやjpeg）とする。
- 最下層のBitmapを拡大縮小や回転しないこと。
- シンボルは１フレーム目から存在していること。
- 親と子のフレーム数は等しいこと。
- イージング加速減速の再現は近似値

## コンバーター非対応事項
----------------------------------------------------------------------------
- シェイプ処理及び、それに伴うシェイプトゥイーン（モーフィング）
- マスク
- グラフィックシンボルの独自指定機能（子の指定フレームのみ表示、指定フレームから再生、など）
- イージングの手動グラフ指定
- ActionScript処理
- ボタン処理
- １レイヤーに複数のインスタンス（原則１レイヤーに１インスタンス）
- シーン
- ガイドレイヤー
- ガイド指定モーション
- 傾斜（反転含む）していないこと
- テキスト（データ的にShapeのため。あらかじめBitmap化しておく）
  →[修正] ＞ [ビットマップに変換]が便利

## その他の備考
----------------------------------------------------------------------------
- ライブラリ内ビットマップのシンボル名に拡張子があること（.pngなどが削除されていないこと）
- ライブラリ内にディレクトリがあった場合、中のシンボルすべてをライブラリ内のroot直下に配置する。
- ラベル指定アニメーションは、ラベル指定ごとに別flaに分離してからコンバートする。
- 同一レイヤー上にて、タイムラインの途中でシンボルを変えない。
- タイムラインの途中（末尾）で空のキーフレームを入れる場合は、空にせず、スケールを0にする。
- モーションがうまくいかない場合、別画像化、別レイヤー化を検討する。
- 自由変形ツールから回転軸は動かさず、入れ子内を移動して回転軸を調整する。
- テクスチャが斜線になり、うまくロードできていないように見える際は、プロジェクトファイルを再度開いてみる。
- SSのXMLファイルはUTF-8だが、Flash batのテキスト書き出しはUTF-8に未対応
（ただしコンバーターで根本的な異常は発生しなかった）

------------------------------------------------------------------------------
# SS と Flash の相違点

## シーンについて
----------------------------------------------------------------------------
- Flashにもシーンという概念はあるが、かなり前からレガシーで非推奨になっている。
  概念的にはrootのタイムラインが伸びているだけにほぼ等しく、SSとは別概念。

## 座標について
----------------------------------------------------------------------------
- SSではステージ中心が原点（0,0）だが、Flashはステージ左上が原点（0,0）
  これはSSのrootの座標をwidthとheightステージサイズ半分ずつ左上に移動することで解消される。

- SSとFlashではy座標のプラスが逆（Flashは上に行くとy座標がマイナスになる。）
  これはy座標に対し-1をかけることにより解消される。


## scaleについて
----------------------------------------------------------------------------
- Flashにはスケール以外にwidthとheightパラメータ（実際のpx数）が存在するが、
  SSに該当項目は存在しない。

- SSにはスケール以外にXサイズ、Yサイズという概念が存在するが、Flashに該当項目
  は存在しない。


## 回転について
----------------------------------------------------------------------------
- SSは(サンプルのZ軸回転の場合)時計回りはマイナスの値だが、Flashはプラスの値

- 3D回転は、Flash側でスケールを駆使しても補完が不自然になり、擬似再現は困難
（Incompatibles/Rotation_xyz.swfなど参照）


## 画像について
----------------------------------------------------------------------------
- SSにはセルマップがあるが、Flashは原則として全画像別ファイルであるため、
  画像と対になるシーンファイルが作成される。


## タイムラインについて
----------------------------------------------------------------------------
- SSは0フレームから始まるが、Flashは1フレームから始まる。

- SSでは親子でタイムライン数が同じだが、Flashでは異なることが多い。
  そのため、Flash制作時にその制約事項（rootとroot以外のタイムライン数を同じにする）
  を守って頂く必要がある。

- FlashではMovieClip化すると、タイムライン編集中には子の状態がわからない。
  その点においてSSは、FlashのMovieClipよりグラフィックシンボルに近いと考えられる。


## レイヤーについて
----------------------------------------------------------------------------
- SSのレイヤーは上のものほど下に描画されているように見えるが、Flashは逆。

- SSでは子供がレイヤー上にぶら下がって見えるが、Flashでは子供の中に入らないと見えない。
  よってSSのレイヤーとFlashのレイヤーは見た目が変わるので注意。


## 反転処理について
----------------------------------------------------------------------------
- SSの上下反転は、Flashの上下反転＋左右反転

- SSの上下反転＋左右反転は、Flashの上下反転

- イメージ反転処理は、対象MC内部をセンタリングすることにより可能。

- 上記のように、SSとFlashの反転処理は異なる部分が多いので、
  反転を交えたアニメーションは原則不可能。
  →Incompatibles/Flip_scale_flip.swfのアニメーションサンプルの動き参照

- また、Flashの反転処理は回転とゆがみをトリッキーに組み合わせているにすぎないため、
  反転やゆがみ(skew)処理が含まれるFlashは、SSへのコンバートに難があるため、制作時に
  反転とskewの使用を避ける。


## 名前（インスタンス名）について
----------------------------------------------------------------------------
- SSではターゲットにかならず名前がついているが、Flashではついていないことが多い。
  そのため、Flash制作時にその制約事項（MovieClipに名前付与。MovieClipではなく
  名前付与不能の場合は、一度MovieClipにしてから名前付与）を守って頂く。

- SSではターゲット名に半角ハイフン-や半角プラス+をつけることができるが、Flashではできない。


## ％系の値について
----------------------------------------------------------------------------
- Flashではalpha値とscaleは0～100%だが、SSでは0～1で異なる。（備考：AS3では同じになる）


## アンカーについて
----------------------------------------------------------------------------
- FlashではAnchor.ssaeでのアンカー処理に該当する処理が存在しない。
  親パーツを縮小すると、子供も必ず縮小されてしまう。
  但しセンタリングなどの整列処理は存在する。


## AlphaBlendについて
----------------------------------------------------------------------------
- FlashにはAlphaBlendが存在しない。（備考：Flash 8以降にはblendModeとして存在）


## アニメーションについて
----------------------------------------------------------------------------
- サンプルのbaseはFlashで言うイージングなし。
- サンプルのaccelはFlashで言う強めのイーズイン。(イージング100程度)
- サンプルのdecelはFlashで言う強めのイーズアウト。(イージング100程度)
- サンプルのbezierはFlashで言う相当強めのイーズイン。（カスタムイーズインで手動編集）
- サンプルのelimiteはFlashに存在しない
（備考：最近のFlashなら、AS制御のeaseInBackである程度可能と考えられる）
- カーブエディタは、SSは値だが、Flashはパーセント指定かつ、正のみかつ、最大100%
- Flashにはrotation値と異なる、回転回数指定（時計回りor半時計回りも）が存在する。


## 非表示について
----------------------------------------------------------------------------
- Flashの非表示は、スクリプト処理以外では存在しない（ごく最近のFlash環境では指定可能）。
  透明度ゼロは存在する。


## 優先度について
----------------------------------------------------------------------------
- Flashに優先度は存在しない。レイヤーと重なり順のみ。
  そのため、親子関係を無視した優先度による描画順変更（サンプルPriority.ssae）
  はできない。


## Nullについて
----------------------------------------------------------------------------
- FlashではNullを明示的に作る項目は無い。ただし空のMovieClipで代用できる。
  サンプルと同じく、非表示（透明度）はかならず子供に伝播するのでそこは同じ。


## UVアニメーションについて
----------------------------------------------------------------------------
- FlashにはUVアニメーション設定項目が存在しないため、UVアニメーションはできない。
（最近の3Dライブラリを用いたFlashなどは別）


## Vertexアニメーションについて
----------------------------------------------------------------------------
- FlashにはVertexアニメーション設定項目が存在しないため、Vertexアニメーションはできない。
（最近の3Dライブラリを用いたFlashなどは別）


## 今後のFlash の互換性維持の方向性について
----------------------------------------------------------------------------
- 最新版のFlash CCではFlashLiteに正式対応していない（作成時と書き出し時の項目から排除されている。）
  特に保存時にスクリプトが削除されていると思われる。




==============================================================================
株式会社ウェブテクノロジ  
http://www.webtech.co.jp/  
Copyright(C) Web Technology Corp.  
==============================================================================

* OPTPiX SpriteStudio, Web Technologyは、株式会社ウェブテクノロジの登録商標です。
* その他の商品名は各社の登録商標または商標です。

[End of TEXT]
