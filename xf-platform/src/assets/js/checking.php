<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>账号-编辑</title>
    <link rel="stylesheet" href="<?=$this->plug_url?>css/wxcloud.min.css"/>
    <link rel="stylesheet" href="<?=$this->plug_url?>css/activity-layout.css"/>
    <script src="<?=$this->plug_url?>js/jquery-1.8.3.min.js" type="application/javascript" language="javascript"></script>
	<script src="<?=$this->plug_url?>js/jquery.form.js" type="application/javascript" language="javascript"></script>
	<script src="http://static.vsapp.cn/js/artDialog/artDialog.js?skin=default"></script>
	<script src="<?=$this->plug_url?>js/Alert.js" type="application/javascript" language="javascript"></script>
</head>
<body>
<div class="activity-container">
    <div class="nav-tab">活动方管理>票务审核>审核</div>
    <form action="<?=url('admin/activity/ajax_do_check')?>" method="post" id="add">
	<input type="hidden" name="goods_id" value="<?=$id?>">
	<div class="form">
        <div class="form-line">
            <p class="name">选择城市</p>
            <select disabled style="width: 150px;">
                <?php if(!empty($citys)){
							foreach($citys as $val){
					?>
                    <option value="<?=$val['id']?>"<?php if($val['id']==$city){?> selected="selected"<?php }?>><?=$val['name']?></option>
					<?php }}?>
            </select>
        </div>
        <div class="form-line">
            <p class="name">活动类型</p>
            <select disabled style="width: 150px;">
                <option value="1"<?php if($type==1){?> selected="selected"<?php }?>>单日活动</option>
                <option value="2"<?php if($type==2){?> selected="selected"<?php }?>>本月多日</option>
				<option value="3"<?php if($type==3){?> selected="selected"<?php }?>>跨月多日</option>
            </select>
        </div>
        <div class="form-line">
            <p class="name">活动日期</p>
            <div class="ui-form-group">
                <input type="text" readonly value="<?=$begin?><?php if($type!=1){ echo ' - '.$end;}?>">
            </div>
        </div>
        <div class="form-line">
            <p class="name">活动标题</p>
            <div class="ui-form-group">
                <input type="text" readonly value="<?=$goods_name?>">
            </div>
            <div class="pass-group">
                <span>合格</span>
                <input name="ck_goods_name" type="radio" value="1" checked>
                <span>不合格</span>
                <input name="ck_goods_name" type="radio" value="2">
                <input name="goods_name" type="text" placeholder="输入不合格原因">
            </div>
        </div>
        <div class="form-line">
            <p class="name">活动时间</p>
            <div class="ui-form-group">
                <input type="text" style="width: 116px" readonly value="<?=$hour_b?>">
            </div>
            <span>　-　</span>
            <div class="ui-form-group">
                <input type="text" style="width: 116px" readonly value="<?=$hour_e?>">
            </div>
        </div>
        <div class="form-line">
            <p class="name">活动地址</p>
            <div class="ui-form-group">
                <input type="text" readonly value="<?=$address?>">
            </div>
            <div class="pass-group">
                <span>合格</span>
                <input name="ck_address" type="radio" value="1" checked>
                <span>不合格</span>
                <input name="ck_address" type="radio" value="2">
                <input name="address" type="text" placeholder="输入不合格原因">
            </div>
        </div>
        <div class="form-line form-line-upload">
            <p class="name">活动方logo<br>200*140px</p>
            <div class="form-upload">
                <div class="img">
                    <img src="<?=$cover?$this->config->item('upload_file_url').$cover:$this->plug_url.'images/pop-up-img.jpg'?>">
                </div>
                <!--<input type="file" class="file">-->
            </div>
            <div class="pass-group pass-group-center">
                <span>合格</span>
                <input name="ck_cover" type="radio" value="1" checked>
                <span>不合格</span>
                <input name="ck_cover" type="radio" value="2">
                <input name="cover" type="text" placeholder="输入不合格原因">
            </div>
        </div>
        <div class="form-line form-line-upload">
            <p class="name">封面图<br>750*650px</p>
            <div class="form-upload">
                <div class="img">
                    <img src="<?=$cover2?$this->config->item('upload_file_url').$cover2:$this->plug_url.'images/pop-up-img.jpg'?>">
                </div>
                <!--<input type="file" class="file">-->
            </div>
            <div class="pass-group pass-group-center">
                <span>合格</span>
                <input name="ck_cover2" type="radio" value="1" checked>
                <span>不合格</span>
                <input name="ck_cover2" type="radio" value="2">
                <input name="cover2" type="text" placeholder="输入不合格原因">
            </div>
        </div>
        <div class="form-line form-line-upload">
            <p class="name">票种</p>
            <ul class="ticket-type" id="ticketType">
                <?php foreach($classes as $key=>$val){?>
				<li>
                    <span class="title"><?=$val['select']?></span>
                    <span>票价</span>
                    <input type="text" readonly value="<?=$val['price']?>">
                    <span>数量</span>
                    <input type="text" readonly value="<?=$val['nums']?>">
                    <span>限购</span>
                    <input type="text" readonly value="<?=$val['max']?>">
                </li>
				<?php }?>
            </ul>
        </div>
        <div class="form-line">
            <p class="name">票务开售时间</p>
            <div class="ui-form-group">
                <input type="text" readonly value="<?=$sale_start?>">
            </div>
        </div>
        <div class="form-line">
            <p class="name">销售结束时间<br>最迟活动当天</p>
            <div class="ui-form-group">
                <input type="text" readonly value="<?=$sale_end?>">
            </div>
        </div>
        <div class="form-line form-line-center">
            <p class="name">门票类型</p>
            <input type="radio" disabled <?php if($is_post!=1){?>checked<?php }?>>
            <span style="margin-right: 20px;">电子票</span>
            <input type="radio" <?php if($is_post==1){?>checked<?php }?> disabled>
            <span>实体票（需邮寄）</span>
        </div>
        <div class="form-line form-line-center">
            <p class="name">身份证</p>
            <input type="radio" disabled <?php if($is_idnum==0){?>checked<?php }?>>
            <span style="margin-right: 20px;">不需要填</span>
            <input type="radio" disabled <?php if($is_idnum==1){?>checked<?php }?>>
            <span>需要</span>
        </div>
        <div id="actList">
            <?php foreach($person as $key=>$val){
				if (!empty($val)){
			?>
			<div class="form-line form-line-upload">
                <p class="name">艺人照片<?=($key+1)?><br>480*230px</p>
                <div class="form-upload">
                    <div class="img">
                        <img src="<?=$this->config->item('upload_file_url').$val['picture']?>">
                    </div>

                </div>
                <div class="pass-group">
                    <span>合格</span>
                    <input name="ck_person_img<?=($key)?>" type="radio" value="1" checked>
                    <span>不合格</span>
                    <input name="ck_person_img<?=($key)?>" type="radio" value="2">
                    <input type="text" name="person_img[<?=($key)?>]" placeholder="输入不合格原因">
                </div>
            </div>
            <div class="form-line form-line-upload">
                <p class="name">艺人logo<?=($key+1)?><br>230*230px<br>png</p>
                <div class="form-upload">
                    <div class="img" style="background-color:#CCCCCC">
                        <img src="<?=$this->config->item('upload_file_url').$val['img']?>">
                    </div>

                </div>
                <div class="pass-group">
                    <span>合格</span>
                    <input name="ck_man_img<?=($key)?>" type="radio" value="1" checked>
                    <span>不合格</span>
                    <input name="ck_man_img<?=($key)?>" type="radio" value="2">
                    <input type="text" name="man_img[<?=($key)?>]" placeholder="输入不合格原因">
                </div>
            </div>
			<?php }}?>
        </div>
        <div id="noticeList">
            <?php foreach($notify as $key=>$val){?>
			<div class="form-line">
                <p class="name">活动须知内容<?=($key+1)?></p>
                <div class="ui-form-group">
                    <input type="text" readonly value="<?=$val?>">
                </div>
                <div class="pass-group">
                    <span>合格</span>
                    <input name="ck_notify<?=$key?>" type="radio" value="1" checked>
                    <span>不合格</span>
                    <input name="ck_notify<?=$key?>" type="radio" value="2">
                    <input type="text" name="notify[<?=$key?>]" placeholder="输入不合格原因">
                </div>
            </div>
			<?php }?>
        </div>
        <!-- 活动详情列表-->
        <div id="detailList">
            <?php foreach($goods_desc as $key=>$val){
					if(!empty($val)){
			?>
			<div class="item">
                <div class="form-line form-line-upload">
                    <p class="name">活动详情图<?=($key+1)?><br>660*333px<br>最多6张</p>
                    <div class="form-upload">
                        <div class="img">
                            <img src="<?=$this->config->item('upload_file_url').$val['img']?>">
                        </div>

                    </div>
                    <div class="pass-group">
                        <span>合格</span>
                        <input name="ck_goods_img<?=$key?>" type="radio" value="1" checked>
                        <span>不合格</span>
                        <input name="ck_goods_img<?=$key?>" type="radio" value="2">
                        <input type="text" name="goods_img[<?=$key?>]" placeholder="输入不合格原因">
                    </div>
                </div>
                <div class="form-line form-line-upload">
                    <p class="name">活动详情简介<?=($key+1)?></p>
                    <div class="ui-form-group">
                        <textarea rows="5" readonly><?=$val['desc']?></textarea>
                    </div>
                    <div class="pass-group">
                        <span>合格</span>
                        <input name="ck_goods_desc<?=$key?>" type="radio" value="1" checked>
                        <span>不合格</span>
                        <input name="ck_goods_desc<?=$key?>" type="radio" value="2">
                        <input type="text" name="goods_desc[<?=$key?>]" placeholder="输入不合格原因">
                    </div>
                </div>
            </div>
			<?php }}?>
        </div>
        <div class="form-line form-line-upload">
            <p class="name">票务咨询电话</p>
            <div class="ui-form-group">
                <input type="text" readonly value="<?=$mobile?>">
            </div>
        </div>
        <div class="form-line">
            <p class="name"></p>
            <button type="button" class="ui-btn ui-btn-primary" id="save">完成审核</button>
        </div>
    </div>
	</form>
</div>

<!--审核 begin-->
    <div class="ui-modal checkedframe" style="display:none;">
        <button type="button" class="ui-btn ui-btn-link close_btn">&times;</button>
        <div class="ui-modal-header">
            <h3>审核操作</h3>
        </div>
        <div class="ui-modal-body">
            <div class="pop-up-2 fc999 marb20">
				<input name="checked" type="radio" value="1" checked="checked" />审核通过　<input name="checked" type="radio" value="3" />审核不通过<br />
				<span id="set_site"><br />设置对应点数<input type="text" name="site" style="width:60px" placeholder="输入点数"  /></span>
				<input type="hidden" name="act_id" value="" />
            </div>
        </div>
        <div class="ui-modal-footer">
            <button type="button" class="ui-btn ui-btn-primary ui-btn-wid checkorder">确认</button>
        </div>
    </div>
<!--审核 end-->
<!--生成海报-->
<div class="frame" style="position:fixed;top:-10000px;left:-10000px;">
    <p>canvas：<canvas id="poster" width="750" height="760" style=' background-color:#fff;'></canvas></p>
    <p>canvas：<canvas id="share" width="750" height="635" style=' background-color:#fff;'></canvas></p>

</div>
</body>
</html>
<link rel="stylesheet" href="<?=$this->plug_url?>css/helve.css"/>
<script>
//提交表单
$("#save").click(function(){
    $("#add").ajaxSubmit({
          url : "<?=url('admin/activity/ajax_do_check')?>",
          type : 'POST',
          dataType: 'json',

          beforeSubmit : function (formData, jqForm, options) {
          },
          success : function (responseText, statusText) {
            Alert(responseText.msg);
            if (responseText.ret == '0') {
                initDraw();//调用生成海报
                setTimeout(function(){
					location.href = '<?=url('admin/activity/act_check')?>';
				},2000);
            }
        }
    });
    return false;
})

<!--生成海报-->
    function imgLoad(src){
        return new Promise(function(resolve,reject){
            var image = new Image();
            image.onload = function(){
                resolve(image);
            };
            image.onerror = function(){
                reject(new Error('Could not load image at ' + src))
            };
            image.src = src;
        })
    }

    //生成海边需要的数据
    var data = {
        id:'<?=$id?>',
        begin:'<?=$begin?>',
        end:'<?=$end?>',
        goods_name:'<?=$goods_name?>',
        activity:'<?=$act?>',
        cover:'<?=$this->config->item('upload_file_url').$cover?>',
        cover2:'<?=$this->config->item('upload_file_url').$cover2?>',
        wxacode:'<?=$wxacode?>',
        type:'<?=$type?>'
    };
//    var imgSrc = 'http://ticket.pc-online.cc/upload/';
    //测试地址才填空，正式放上去记得填前缀地址
    var imgSrc = '';
    function initDraw(){
        Promise.all([
            imgLoad('<?=url()?>static/top.png'),
            imgLoad('<?=url()?>static/bottom.png'),
            imgLoad(imgSrc+data.cover),
            imgLoad(imgSrc+data.cover2),
            imgLoad(data.wxacode),
            imgLoad('<?=url()?>static/ticket-top.png')
        ]).then(function(res){
            //海报的base64
            var posterImgData = drawPoster(res);
            //分享图的base64
            var shareImgData = drawShare(res);

			$.post('<?=url('client/api/save_poster')?>', { id:'<?=$id?>', baseimg:posterImgData }, function(rs){
				console.log(rs);
			}, 'json');

        });
    }
    //画海报
    function drawPoster(res){
        var c = document.getElementById('poster');
        var ctx = c.getContext('2d');
        //背景色
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 750, 760);

        //顶部波浪图
        ctx.drawImage(res[0], 0, 0,750,145);
        //日期
        ctx.font = "27px 'Helve'";
        ctx.fillStyle = '#000000';
        var ten = data.begin.slice(2,3),one = data.begin.slice(3,4);
        var type = data.type;
        if(type == 1){
            ctx.fillText(`2         0         ${ten}         ${one}`,20,190);
        }else if(type == 2){
            ctx.fillText(`2           0           ${ten}           ${one}`,20,190);
        }else if(type == 3){
            ctx.fillText(`2           0           ${ten}           ${one}`,20,190);
        }
        var date;
        if(type == 1){
            ctx.font = "100px 'Helve'";
            date = data.begin.substr(5,5);
            ctx.fillText(date,20,300);
        }else if(type == 2){
            ctx.font = "80px 'Helve'";
            date = data.begin.substr(5,5)+'-'+data.end.substr(8,2);
            ctx.fillText(date,20,294);
        }else if(type == 3){
            ctx.font = "60px 'Helve'";
            date = data.begin.substr(5,5)+'-'+data.end.substr(5,5);
            ctx.fillText(date,20,290);
        }
        //标题
        ctx.font = "44px 'Helve'";
        ctx.fillText(data.goods_name+' | '+data.activity,20,390);
        // 竖线
        ctx.strokeStyle = '#c1c1c1';
        ctx.beginPath();
        if(type == 1){
            ctx.moveTo(310,160);
            ctx.lineTo(310,320);
        }else if(type == 2){
            ctx.moveTo(370,160);
            ctx.lineTo(370,320);
        }else if(type == 3){
            ctx.moveTo(380,160);
            ctx.lineTo(380,320);
        }

        ctx.stroke();
        //横线 短
        ctx.beginPath();
        ctx.moveTo(0,210);
        if(type == 1){
            ctx.lineTo(310,210);
        }else if(type == 2){
            ctx.lineTo(370,210);
        }else if(type == 3){
            ctx.lineTo(380,210);
        }
        ctx.stroke();
        //横线 长
        ctx.beginPath();
        ctx.moveTo(0,320);
        ctx.lineTo(750,320);
        ctx.stroke();
        //logo
        var logoXArr = [530-100,560-100,560-100];
        ctx.drawImage(res[2],logoXArr[type-1],240-70,200,140);
        //详情图
        ctx.drawImage(res[3],0,420,750,650);
        //底部logo
        ctx.drawImage(res[1],450,460,300,300);
        //二维码
        ctx.drawImage(res[4],610,615,120,120);

        return c.toDataURL("image/jpeg");
    }
    //画分享图
    function drawShare(res){
        var c = document.getElementById('share');
        var ctx = c.getContext('2d');
        //背景色
        ctx.fillStyle = '#f6f6f6';
        ctx.fillRect(0, 19, 750, 634);
        //顶部波浪图
        ctx.drawImage(res[5],  0, 14, 750, 5);
        //日期
        ctx.font = "27px 'Helve'";
        ctx.fillStyle = '#000000';
        var ten = data.begin.slice(2,3),one = data.begin.slice(3,4);
        var type = data.type;
        if(type == 1){
            ctx.fillText(`2         0         ${ten}         ${one}`,20,64);
        }else if(type == 2){
            ctx.fillText(`2           0           ${ten}           ${one}`,20,64);
        }else if(type == 3){
            ctx.fillText(`2           0           ${ten}           ${one}`,20,64);
        }
        var date;
        if(type == 1){
            ctx.font = "100px 'Helve'";
            date = data.begin.substr(5,5);
            ctx.fillText(date,20,174);
        }else if(type == 2){
            ctx.font = "80px 'Helve'";
            date = data.begin.substr(5,5)+'-'+data.end.substr(8,2);
            ctx.fillText(date,20,168);
        }else if(type == 3){
            ctx.font = "60px 'Helve'";
            date = data.begin.substr(5,5)+'-'+data.end.substr(5,5);
            ctx.fillText(date,20,164);
        }
        //标题
        ctx.font = "44px 'Helve'";
        ctx.fillText(data.goods_name+' | '+data.activity,20,264);
        // 竖线
        ctx.strokeStyle = '#c1c1c1';
        ctx.beginPath();
        if(type == 1){
            ctx.moveTo(310,34);
            ctx.lineTo(310,194);
        }else if(type == 2){
            ctx.moveTo(370,34);
            ctx.lineTo(370,194);
        }else if(type == 3){
            ctx.moveTo(380,34);
            ctx.lineTo(380,194);
        }

        ctx.stroke();
        //横线 短
        ctx.beginPath();
        ctx.moveTo(0,84);
        if(type == 1){
            ctx.lineTo(310,84);
        }else if(type == 2){
            ctx.lineTo(370,84);
        }else if(type == 3){
            ctx.lineTo(380,84);
        }
        ctx.stroke();
        //横线 长
        ctx.beginPath();
        ctx.moveTo(0,194);
        ctx.lineTo(750,194);
        ctx.stroke();
        //logo
        var logoXArr = [530-100,560-100,560-100];
        ctx.drawImage(res[2],logoXArr[type-1],114-70,200,140);
        //详情图
        ctx.drawImage(res[3],0,294,750,650);
        //底部logo
        ctx.drawImage(res[1],450,334,300,300);

        return c.toDataURL("image/jpeg");
    }
</script>
