<style>
    .laws-frame{ width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.9); z-index: 500; position: fixed; top: 0; left: 0; overflow-y: scroll;}
    .laws-frame::-webkit-scrollbar{ width: 3px; background-color: rgba(0,0,0,0);}
    .laws-frame::-webkit-scrollbar-thumb{ background-color: #ffffff;}
    .laws-frame .logo{ width: 100%; text-align: center; margin-top: 80px; font-size: 32px; color: #ffffff;}
    .laws-frame .content{ width: 1300px; margin: 40px auto; display: flex; justify-content: space-between;}
    .laws-frame .content .laws-list{ margin-top: 60px;}
    .laws-frame .content .laws-list li{ width: 480px; font-size: 14px; color: #ffffff; margin-bottom: 50px; line-height: 1.5; position: relative;}
    .laws-frame .content .laws-list li span{ font-size: 50px; position: absolute; top: -25px; left: -50px; font-weight: bold;}

    .laws-frame .content .document{ width: 660px;}
    .laws-frame .content .document .btns{ width: 270px; border-radius: 6px; background-color: #c8c9cb; overflow: hidden; display: flex; margin-left: 390px; margin-bottom: 20px;}
    .laws-frame .content .document .btns li{ width: 50%; height: 40px; font-size: 14px; color: #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer;}
    .laws-frame .content .document .btns li.active{ background-color: #002aa6;}
    .laws-frame .content .document .scroll{ border: 2px solid #ffffff; height: 530px; box-sizing: border-box; padding: 10px 20px; overflow-y: scroll;}
    .laws-frame .content .document .scroll::-webkit-scrollbar{ width: 3px; background-color: rgba(0,0,0,0);}
    .laws-frame .content .document .scroll::-webkit-scrollbar-thumb{ background-color: #ffffff;}

    .laws-frame .content .document .scroll .title{ font-size: 18px; text-align: center;}
    .laws-frame .content .document .scroll p{ font-size: 12px; color: #ffffff; line-height: 30px; text-indent: 2em;}

    .laws-frame .btn-sub{ width: 270px; margin-left: 390px; margin-top: 20px;}
    .laws-frame .laws-close{font-size: 40px; color: #ffffff; position: absolute; top: 35px; right: 37px;}
</style>

<template>
    <div class="laws-frame">
        <div class="logo"><i class="icon-logo"></i></div>
        <a href="javascript:;" class="laws-close" @click="$emit('close')"><Icon type="md-close" /></a>
        <div class="content">
            <div class="laws-list">
                <ul>
                    <li><span>1</span>所有填写的信息均具有法律效应，请遵守中华人民共和国法律。</li>
                    <li><span>2</span>小夫有票 首要保护的是购票者，任何损害购票者权益并经过核查的，小夫有票 有权终止活动方的功能并冻结账户。</li>
                    <li><span>3</span> 小夫有票 仅作为您发布票务活动的平台，资料文件存在造假行为均由发布票务方承担责任，在任何情况下，小夫有票 均不为任何内容负责，但 小夫有票 有权依法停止展示任何票务活动并采取相应行动，包括但不限于保存有关记录，并向有关机关报告等。</li>
                    <li><span>4</span>为了更好地为您提供服务，小夫有票 可能会向关联公司共享您的个人信息；我们只会共享必要的个人信息，且受《隐私权专项条款》约束。</li>
                    <li><span>5</span>您在 小夫有票 上传或发布的内容应保证您为您发布内容（包括但不限于文字、图片、视频等）的著作权人或已取得合法授权，并且该内容不会侵犯任何第三方的合法权益。</li>
                    <li><span>6</span>由于服务器原因，正常销售的票务在人流量过大的情况下有可能会出现实际销售票数超出设定票数的情况，营收金额也会对应增加。</li>
                </ul>
            </div>
            <div class="document">
                <ul class="btns">
                    <li :class="documentIndex == 0 ? 'active' : ''" @click="documentIndex = 0">服务协议</li>
                    <li :class="documentIndex == 1 ? 'active' : ''" @click="documentIndex = 1">隐私权专项条款</li>
                </ul>
                <div class="scroll">
                    <div v-if="documentIndex === 0" class="tab">
                        <p class="title">小夫有票editor活动方服务协议</p>
                        <p>欢迎您访问何方（深圳）设计事务所有限公司及其关联公司所经营的小夫有票editor（域名为editor.leesticket.com下同）。在您使用小夫有票各项服务之前，请您认真阅读并理解《小夫有票editor活动方服务协议》（以下简称 “本协议”）。请您重点关注关于会员个人信息保护、责任范围及免责、法律适用及管辖等内容的条款，该类条款会以下划线方式标注。</p>
                        <p>一、本协议的确认和接受</p>
                        <p>1、当您按照注册页面提示完成信息填写并同意本协议内容后，本协议在您与小夫有票之间成立并发生法律效力，同时您成为小夫有票editor的活动方。如您是未成年用户，请在法定监护人的陪同下仔细阅读本使用协议，您及法定监护人应按照法律及本协议规定承担责任。</p>
                        <p>2、为了您能够使用小夫有票editor所提供的各项服务，您需要同意本协议下您所选服务对应的服务条款。如果您对本协议有疑问，可随时通过小夫有票客服（电话：186-8143-8270）进行询问，小夫有票将向您解释阐述本协议相关内容。在您对本协议内容存在异议、无法准确理解或持有反对意见的情况下，您有权利立即停止会员注册进程，拒绝接受小夫有票提供的购票等任何服务。</p>
                        <p>3、本协议内容包括协议正文及小夫有票所有已经发布的或将来可能发布并采取合理途径通知的的各类条款、限制与要求。前述各项为本协议的补充条款，与本协议正文具有同等法律效力。小夫有票有权根据相关法律法规的出台或修订、主管部门的要求以及服务方式的变更等情况酌情变更本协议内容，因考虑到小夫有票会员众多且联系方式会不时地发生变化，您理解并同意关于本协议的任何变更，小夫有票将以刊载公告或者弹窗的形式进行通知，并自公告通知之日起生效。若您不同意相关条款的变更，您有权立即终止使用小夫有票的服务。</p>
                        <p>二、服务简介</p>
                        <p>1、您可以在小夫有票editor发布并分享演出/赛事等活动（以下合称“票务”），在小夫有票发布活动、上传图片等。小夫有票在此郑重提请您注意，小夫有票仅提供信息存储空间服务，任何经由小夫有票而发布、上传的文字、图片、图形或其他资料（以下简称“内容 ”），均由内容提供者承担责任。在任何情况下，小夫有票均不为任何内容负责，但小夫有票有权依法停止展示任何前述内容并采取相应行动，包括但不限于保存有关记录，并向有关机关报告等。</p>
                        <p>2、在各票务开始售票前，小夫有票会履行审慎义务，查阅各票务的行政审批手续及主办方/承办方的相关证照及资质文件。请您注意，对于不属于小夫有票主办的票务，小夫有票并无能力完全辨别出资料文件的真伪，小夫有票仅作为您发布票务活动的平台，资料文件存在造假行为均由发布票务方承担责任，在任何情况下，小夫有票均不为任何内容负责，但小夫有票有权依法停止展示任何票务活动并采取相应行动，包括但不限于保存有关记录，并向有关机关报告等</p>
                        <p>3、根据相关法律法规规定或行政部门对特殊票务要求，小夫有票的部分服务或特殊票务将要求您进行实名认证，否则小夫有票将因法律规定或相关要求无法为您提供相应的服务或票务销售。</p>
                        <p>4、您可以在小夫有票editor上查询演出/赛事的名称、时间、地点、演员/球员阵容等相关票务信息，且可查看对应活动的用户订单信息、销售数量、购票人员地区分布等，继而获取您票务活动销售数据的情况。</p>
                        <p>三、服务变更、中断及终止</p>
                        <p>1、小夫有票保留变更、中断及终止全部或部分服务的权利和根据实际情况随时调整提供的服务种类、服务内容、服务方式的权利。对于调整，小夫有票将尽可能提前1个月进行公告。</p>
                        <p>2、在接收公安、检察院、法院等行政或司法机关通知的情况下，小夫有票可立即将您在小夫有票注册的账户及账户内余额（如有）暂时中断或冻结，直至接到前述机关作出的解除的书面通知后恢复。</p>
                        <p>四、关于您的账户</p>
                        <p>1、您成为小夫有票会员后，您有权随时更改您的账户密码，同时您有义务谨慎保存、使用账户密码。</p>
                        <p>2、您须自行负责对您的活动方名、密码和手机号码保密，且须对该活动方名、密码和手机号码下发生的所有活动（包括但不限于信息披露、发布信息、网上点击同意或购买服务等）承担责任。您同意：</p>
                        <p>（1）您成为小夫有票editor活动方后，因服务所需，小夫有票可能会收集您的姓名、性别、生日、电子邮箱、银行卡号、收货地址等个人信息；</p>
                        <p>（2）确保您在每个上网时段结束时，以正确步骤离开网站。小夫有票无法对因您未能遵守本款规定而发生的任何损失或损毁负责。您理解小夫有票对您的请求采取行动需要合理时间，小夫有票对在采取行动前已经产生的后果（包括但不限于您的任何损失）不承担任何责任；</p>
                        <p>（3）如发现任何人未经授权使用您的活动方名、密码和手机号码等其他情况，您可以立即通知小夫有票，并授权小夫有票采取相应的限制行动；账户因您主动泄露或因您遭受他人攻击、诈骗等行为导致的损失及后果，小夫有票并不承担责任，您应通过司法、行政等救济途径向侵权行为人追偿；</p>
                        <p>（4）除非有法律规定或司法裁定，且征得小夫有票的同意，否则，您的小夫有票账户不得以任何方式转让、赠与或继承（与账户相关的财产权益除外）。</p>
                        <p>3、小夫有票可基于服务需要，变更或增加履约主体，如继续使用小夫有票服务，视为您同意变更后的主体或新增的主体作为与您履约的相对方。</p>
                        <p>五、活动方个人信息保护</p>
                        <p>1、小夫有票非常重视您的个人信息的保护，在您使用小夫有票提供的服务时，您同意小夫有票按照所公布的《隐私权专项条款》收集、使用、分享、存储和保护您的个人信息。小夫有票希望通过《隐私权专项条款》向您清楚地介绍小夫有票对您个人信息的处理方式，因此小夫有票建议您完整地阅读《隐私权专项条款》，以帮助您更好地保护您的个人信息。</p>
                        <p>2、您声明并保证，您对您所发布的信息拥有合法的权利。否则，小夫有票可对您发布的信息依法或依本协议进行删除或屏蔽。您应当确保您所发布的信息不包含以下内容：</p>
                        <p>（1）违反国家法律法规禁止性规定的；</p>
                        <p>（2）政治宣传、封建迷信、淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；</p>
                        <p>（3）欺诈、虚假、不准确或存在误导性的；</p>
                        <p>（4）侵犯他人知识产权或涉及第三方商业秘密及其他专有权利的；</p>
                        <p>（5）侮辱、诽谤、恐吓、涉及他人隐私等侵害他人合法权益的；</p>
                        <p>（6）存在可能破坏、篡改、删除、影响小夫有票任何系统正常运行或未经授权秘密获取小夫有票及其他会员的数据、个人资料的病毒、木马、爬虫等恶意软件、程序代码的；</p>
                        <p>（7）其他违背社会公共利益或公共道德或依据小夫有票相关协议、条款的约定不适合在小夫有票上发布的。</p>
                        <p>3、为了更好地为您提供服务，小夫有票可能会向关联公司共享您的个人信息；我们只会共享必要的个人信息，且受《隐私权专项条款》约束。</p>
                        <p>六、知识产权</p>
                        <p>1、小夫有票在服务中提供的内容（包括但不限于网页、界面设计、版面框架、文字、音频、视频、图片或其他资料等）等知识产权归小夫有票或相关权利人所有。除另有约定外，小夫有票提供本服务时所依托的软件、系统等的著作权、专利权及其他知识产权归小夫有票所有。未经小夫有票事先书面同意，您不得擅自删除、掩盖或更改小夫有票的版权声明、商标或其它权利声明，不得将小夫有票的商标以任何方式展示或使用或作其它处理。</p>
                        <p>2、您在小夫有票上传或发布的内容应保证您为您发布内容（包括但不限于文字、图片、视频等）的著作权人或已取得合法授权，并且该内容不会侵犯任何第三方的合法权益，您同意授权小夫有票及其关联公司可在全球范围内、完全免费、不可撤销的、无期限限制的、可转授权地使用上述所有内容。具体来说，可能会包括：</p>
                        <p>（1）将前述内容复制、翻译、编入小夫有票当前已知或以后开发的作品、媒体或技术中，用于小夫有票相关用途开发或推广宣传等；</p>
                        <p>（2）将前述内容授权给电台、电视台、网络媒体、运营商平台等与小夫有票有合作的媒体或运营商播放、传播，用于小夫有票相关推广宣传等；</p>
                        <p>（3）其他小夫有票及其关联公司出于善意或另行取得您授权的使用行为。</p>
                        <p>您对小夫有票及其关联公司的前述授权并不改变您发布内容的所有权及知识产权归属，也并不影响您行使对您自身发布内容的合法权利。</p>
                        <p>2、您知悉、理解并同意授权小夫有票及其关联公司对您发布的内容进行审查、删减、修改等。</p>
                        <p>3、小夫有票对您在小夫有票上传或发布的内容享有优先合作权。</p>
                        <p>4、您承诺并保证您所发布的内容不包含下述信息：</p>
                        <p>（1）反对宪法所确定的基本原则的；</p>
                        <p>（2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</p>
                        <p>（3）损害国家荣誉和利益的；</p>
                        <p>（4）煽动民族仇恨、民族歧视、破坏民族团结的；</p>
                        <p>（5）破坏国家宗教政策，宣扬邪教和封建迷信的；</p>
                        <p>（6）散布谣言，扰乱社会秩序，破坏社会稳定的；</p>
                        <p>（7）散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</p>
                        <p>（8）侮辱或者诽谤他人，侵害他人合法权利的；</p>
                        <p>（9）含有虚假、诈骗、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、猥亵、或其他道德上令人反感的内容；</p>
                        <p>（10）含有中国法律、法规、（部门）规章以及任何具有法律效力之规范所限制或禁止的其他内容的；</p>
                        <p>（11）侵犯他人著作权、专利权、商标权、商业秘密或其他专属权利；</p>
                        <p>（12）含有小夫有票认为不适合在小夫有票展示的内容。</p>
                        <p>七、责任范围与免责</p>
                        <p>1、您明确理解并同意，作为演出/赛事活动的票务代理方，小夫有票不承担除法律明确规定外的责任。若您与主办方之间出现争议，小夫有票将尽力为您协调处理保障您的利益，但无法保证协调结果符合您的期望，小夫有票无权对争议作出处理。</p>
                        <p>2、除因小夫有票单方原因故意或过失导致您损失的情况外，小夫有票不对您的损失承担责任。</p>
                        <p>八、赔偿</p>
                        <p>小夫有票尊重他人合法权益（包括知识产权、名誉权、商誉权等），呼吁您也尊重他人合法权益，您明确理解并同意，如因您违反有关法律法规或者本协议约定，使小夫有票遭受任何损失或受到第三方的追索，或任何行政管理部门的处罚，小夫有票有权采取相应行为来终止侵权行为，包括但不限于终止您对账户的使用、删除违规内容等，并有权要求您应赔偿小夫有票因此受到的损失。</p>
                        <p>九、不可抗力</p>
                        <p>如因不可抗力或其它小夫有票无法控制的原因使小夫有票销售系统崩溃或无法正常使用导致网上交易无法完成、丢失有关的信息记录或服务被迫终止等情况，除法律有明确规定外，小夫有票无须承担责任，另外，小夫有票会尽可能合理地协助处理善后事宜，并努力使您免受经济损失。</p>
                        <p>十、法律适用及管辖</p>
                        <p>1、本协议的条款是可分割的，如本协议任何条款被裁定为无效或不可执行，该条款可被删除而其余条款应予以执行。</p>
                        <p>2、法律管辖和适用本协议的订立、执行和解释及争议的解决均应适用中国法律。如双方就本协议内容或其执行发生任何争议，双方应尽力友好协商解决；协商不成时，任何一方均可向何方（深圳）设计事务所有限公司所在地区人民法院提起诉讼。</p>
                    </div>
                    <div v-if="documentIndex === 1" class="tab">
                        <p class="title">小夫有票隐私权专项条款</p>
                        <p>一、我们如何收集您的信息</p>
                        <p>个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。</p>
                        <p>个人敏感信息是指一旦泄露、非法提供或滥用可能危害人身和财产安全，极易导致个人名誉、身心健康受到损害或歧视性待遇等的个人信息。</p>
                        <p>我们会基于本条款所述的以下目的，收集和使用您的个人信息：</p>
                        <p>（一）核心功能，基于实现网上售票服务所收集必要信息</p>
                        <p>1、注册会员</p>
                        <p>为完成创建账号，您需提供以下信息：您创建的活动方名、密码和手机号码。</p>
                        <p>在注册过程中，如果您提供以下额外信息，将有助于我们为您提供更好的票务服务和体验：营业执照、所属公司、联系地址、负责人姓名、身份证号、负责人联系电话。但如果您不提供这些信息，将不会影响使用本服务的基本浏览功能。在上传您的活动方logo时，需要您谨慎地上传清晰有效符合条件的指定图片文件，避免您的在发布活动时存在活动方不明的情况。</p>
                        <p>2、实名信息及实名认证</p>
                        <p>在出现以下情形时我们将会收集实名制信息：（1）在您使用小夫有票editor发布票务活动服务时，需实名认证；（2）根据法律规定对跟帖评论服务实名制的要求；（3）根据法律规定以及公安监管部门对大型活动中主办方实名制的要求。我们收集的实名信息可能包括真实姓名、身份证号码、护照号码、港澳通行证、台胞证。</p>
                        <p>为了保证信息的真实性和唯一性，我们会基于您所提供的信息通过征信平台或其他惯常方式进行实名验证，实名认证成功后您所提供的实名信息将不可修改。</p>
                        <p>3、支付结算</p>
                        <p>为了顺利地完成活动票务支付结算，您可以通过绑定银行获取支付结算，我们可能会将您的订单信息共享给金融机构或支付机构，目的仅为完成订单结算。</p>
                        <p>4、提供发票</p>
                        <p>当您需要开具发票时，根据法律规定，您需提供以下信息：您的姓名或公司完整名称和公司税号，信息一经提交将不可修改，提供的发票仅为普通发票，需收取3.6%的税点。</p>
                        <p>（二）其他用途</p>
                        <p>我们将信息用于本条款未载明的其他用途，或者将基于特定目的收集而来的信息用于其他用途时，会事先征求您的同意。</p>
                        <p>（三）征得授权同意的例外</p>
                        <p>1、与国家安全、国防安全有关的；</p>
                        <p>2、与公共安全、公共卫生、重大公共利益有关的；</p>
                        <p>3、与犯罪侦查、起诉、审判和判决执行等有关的；</p>
                        <p>4、所收集的个人信息是个人信息主体自行向社会公众公开的；</p>
                        <p>5、从合法公开披露的信息中收集的您的个人信息的，如合法的新闻报道、政府信息公开等渠道；</p>
                        <p>6、为合法的新闻报道所必需的；</p>
                        <p>7、学术研究机构基于公共利益开展统计或学术研究所必要，且对外提供学术研究或描述的结果时，对结果中所包含的个人信息进行去标识化处理的；</p>
                        <p>8、法律法规规定的其他情形。</p>
                        <p>二、我们如何使用 Cookie和同类技术</p>
                        <p>1、为确保网站正常运转，我们会在您的计算机或移动设备上存储名为Cookie 的小数据文件。Cookie 通常包含标识符、站点名称以及一些号码和字符。借助于 Cookie，网站能够存储您的偏好或订单等数据。在您使用服务时，Cookie 和同类技术会自动采集您的设备或软件信息（移动设备、网页浏览器、IP地址和移动设备所用的版本和设备识别码）。</p>
                        <p>2、我们不会将 Cookie 用于本条款所述目的之外的任何用途。您可根据自己的偏好管理或删除Cookie。您可以清除计算机上保存的所有 Cookie，大部分网络浏览器都设有阻止 Cookie 的功能。但如果您这么做，则需要在每一次访问我们的网站时亲自更改用户设置。</p>
                        <p>三、我们如何共享、转让、公开披露您的个人信息</p>
                        <p>（一）共享</p>
                        <p>尊重并保护您的隐私权是小夫有票的底线和基本原则，小夫有票不会向第三方提供您的个人信息，但下列情形外：</p>
                        <p>1、获得您的明确授权或同意后，我们会与其他公司、组织和个人分享您的个人信息；</p>
                        <p>2、为遵守适用的法律法规、诉讼目的、行政机关或司法机关依法提出的要求，我们可能有必要披露您的个人信息；基于符合法律法规的社会公共利益而使用；</p>
                        <p>3、为了更好地为您提供服务，小夫有票可能会向关联公司共享您的个人信息；我们只会共享必要的个人信息且受本条款中所声明目的的约束（如为了在境外提供票务服务所需，我们可能向境外关联公司共享您必要的个人信息），如共享您的个人敏感信息或关联公司改变个人信息的使用及处理目的，将再次征求您的授权同意；</p>
                        <p>4、在明确告知您的前提下，我们为完成购票交易或提供相关服务而必须提供的信息；</p>
                        <p>5、与授权合作伙伴共享：仅为实现本条款中声明的目的，我们的某些服务将由授权合作伙伴提供。我们可能会与合作伙伴共享您的某些个人信息，以提供更好的客户服务和用户体验。我们仅会出于合法、正当、必要、特定、明确的目的共享您的个人信息。我们的合作伙伴无权将我们共享的个人信息用于任何其他用途。</p>
                        <p>目前，我们共享个人信息的合作伙伴包括以下的类型：</p>
                        <p>（1）境外关联公司及票务合作伙伴。部分在中国大陆地区以外举办的境外票务（“境外票务”）中，基于为您提供票务服务所必须，我们会将您提供的实名信息（真实姓名、身份证号码、护照号码、港澳通行证、台胞证）中的全部或部分分享至我们在香港地区的关联公司并由其提交给境外票务合作方，用于现场验票、安检及身份确认等。</p>
                        <p>6、对我们与之共享个人信息的公司、组织和个人，我们会与其签署严格的保密协定，要求他们按照本条款以及其他相关的保密和安全措施来使用您的个人信息。</p>
                        <p>（二）转让</p>
                        <p>我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：</p>
                        <p>1、在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的个人信息；</p>
                        <p>2、根据适用的法律法规、法律程序的要求、强制性的行政或司法要求所必须的情况进行转让；</p>
                        <p>3、符合与您签署的相关协议（包括在线签署的电子协议以及相应的平台规则）或其他的法律文件约定所转让；</p>
                        <p>4、在涉及合并、收购或破产清算时，如涉及到个人信息转让，我们会在要求新的持有您个人信息的公司、组织继续受本条款的约束，否则我们将要求该公司、组织重新向您征求授权同意。</p>
                        <p>（三）公开披露</p>
                        <p>我们仅会在以下情况下，公开披露您的个人信息：</p>
                        <p>1、获得您明确同意或基于您的主动选择；</p>
                        <p>2、若有活动方存在着自发性的、恶意的做出损害小夫有票的声誉、收益等行为，小夫有票则有权公开披露该活动方的个人信息；</p>
                        <p>3、基于法律规定、诉讼或政府主管部门强制性要求的情况下，我们可能会公开披露您的个人信息。</p>
                        <p>四、我们如何存储和保护您的个人信息</p>
                        <p>（一）存储</p>
                        <p>1、存储地域</p>
                        <p>我们在中华人民共和国境内运营中收集和产生的个人信息，存储在中国境内，以下情形除外：</p>
                        <p>（1）法律法规有明确规定；</p>
                        <p>（2）获得您的明确授权，如，在部分境外票务中，基于为您提供票务服务所必须，我们可能会在另行征得您同意的前提下将您提供的实名信息存储在香港地区以及票务所在国家或地区；</p>
                        <p>（3）您通过互联网进行跨境交易等个人主动行为或我们征得您的同意后进行跨境传输数据。</p>
                        <p>2、存储期限</p>
                        <p>除非法律法规另有规定，您的个人信息我们将保存至您账号注销之日后的十二（12）个月。我们承诺这是为了保证您的权益，您个人信息在小夫有票须保存的最短期间。当您的个人信息超出我们所保存的期限后，我们会对您的个人信息进行删除或匿名化处理。</p>
                        <p>（二）保护</p>
                        <p>1、我们会采取一切合理可行的措施，保护您的个人信息。小夫有票editor使用SSL安全证书，SSL可以在活动方使用的客户端（如：浏览器）和Web服务器之间建立一个加密的通道，所有在网络上传输的数据都会先进行加密，当传输到目的地以后再进行解密，这样传输过程中即使数据包被截获，也很难破解其中的内容。我们以活动方通过浏览器访问小夫有票为例，SSL技术能自动激活浏览器显示“锁”型安全标志，地址栏“https”开头的页面意味着在浏览器和Web服务器之间已建立起一条SSL安全加密通道，此时活动方在线输入的信用卡号、交易密码等机密信息在网络传输过程中将不会被查看、窃取和修改。</p>
                        <p>2、我们会采取一切合理可行的措施，遵守收集信息必要性原则，我们只会在本条款声明的期限内保留您的个人信息，除非需要法律法规规定的事由。</p>
                        <p>3、小夫有票温馨提醒您，请您尽量不要在社交网络平台晒出您的订票信息和个人信息，或在披露时进行有效的信息遮挡，以避免不法分子利用您公开的信息进行诈骗。</p>
                        <p>4、互联网环境并非百分之百安全，我们将尽力确保或担保您发送给我们的任何信息的安全性。如果我们的物理、技术、或管理防护设施遭到破坏，导致信息被非授权访问、公开披露、篡改或破坏，致使您的合法权益受损害，我们将承担相应的法律责任。</p>
                        <p>5、在不幸发生个人信息安全事件后，我们将按照法律法规的要求，及时向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。同时，我们还将按照监管部门要求，主动上报个人信息安全事件的处置情况。</p>
                        <p>五、您的权利</p>
                        <p>（一）访问、更正或补充您的个人信息</p>
                        <p>1、账户信息：如果您希望访问或编辑您的账户中的个人基本资料信息，在网页端（editor.leesticket.com）,您可以通过登陆账号在“个人信息”执行此操作。</p>
                        <p>2、更改绑定手机：在网页端（editor.leesticket.com）,您可以通过登陆账号在“个人信息”，点击“更改绑定手机”。</p>
                        <p>（二）申请注销账户</p>
                        <p>您可以向小夫有票客服申请注销账户。您注销账户后，我们将停止为您提供产品或服务。除法律法规另有规定外，您的个人信息我们将保存至您账号注销之日后的十二（12）个月，我们将删除您的个人信息或使其匿名化处理。但如您尚有订单未完成或其他例外情形，我们需待上述情形消失后予以注销。</p>
                        <p>您可以通过更正、删除、注销的方式来收回您授权同意我们使用的个人信息（例如，您可以按照本条款“第五条”约定，通过收回您对接收票务订阅信息的授权来退订票务订阅信息），当您收回授权同意后，我们将不再以相应的方式处理您相应的个人信息。但您收回授权同意的决定，不会影响此前我们基于您的授权同意而开展的对您个人信息所进行的处理。</p>
                        <p>六、我们如何处理未成年人的个人信息</p>
                        <p>如您为未成年人，请您在法定监护人陪同下仔细阅读本条款，并在征得您的法定监护人同意的前提下向我们提供您的个人信息。</p>
                        <p>七、《隐私权专项条款》如何更新</p>
                        <p>随着法律法规的出台或修订，我们的《隐私权专项条款》可能会发生变更。条款内容变更后，我们会以公告或站内信的形式通知您我们对条款所做的任何变更，或以其他适当方式提醒您相关内容的更新。</p>
                        <p>八、如何联系我们</p>
                        <p>如您对本《隐私权专项条款》内容有任何疑问、意见或建议，您可通过客服渠道联系我们，官方客服电话为：186-8143-8270，同时您也可以联系我们微信客服：leesticketaftersales</p>
                    </div>
                </div>
                <div class="btn-sub" v-if="!readonly">
                    <t-button @dotap="dosubmit">我已阅读本页条款并同意</t-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="es6">
import TButton from '@/components/common/TButton.vue'
export default {
   name: 'App',
   components: { TButton },
   props: {
      readonly: {
         type: Boolean,
         default: false
      }
   },
   data () {
      return {
         documentIndex: 0
      }
   },
   methods: {
      dosubmit () {
         let self = this
         this.$tModal.confirm({
            title: '是否确认已阅读本页条款并同意？',
            content: '确认同意后，在小夫有票售票平台您将严格履行本条款，若有触犯则将以条款所述进行处理。',
            onOk () {
               self.$emit('dosubmit')
            }
         })
      }
   }
}

</script>
