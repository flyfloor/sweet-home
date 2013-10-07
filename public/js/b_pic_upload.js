// $(document).ready(function(){
// 	var button = $("#select_img"),interval;
// 	var loadErrMsg = $("<span id='load_err_msg'>图片不是 .jpg、.png 或 .gif 格式，无法上传。</span>");
// 	new AjaxUpload(button, {
// 		action: "/images/image_upload",
// 		name:"uploadimage[image_file]",
// 		type: "POST",
// 		onChange: function(file, ext){
// 			$("#load_err_msg").remove();
// 			if (ext && /^(jpg|png|jpeg|gif)$/.test(ext.toLowerCase())) {
// 				this.setData({
// 					"info":'文件类型为图片',
// 				});
// 				this.submit();
// 			}else{
// 				loadErrMsg.insertAfter(button);
// 				return false;
// 			};
// 		},
// 		onSubmit: function (file, ext) {//提交文件时执行的方法
//             button.text('上传中');
//             this.disable();
//             interval = window.setInterval(function () {
//                 var text = button.text();
//                 if (text.length < 10) {
//                     button.text(text + '|');
//                 } else {
//                     button.text('上传中');
//                 }
//             }, 200);
//         },
//         onComplete: function (file, response) {//文件提交完成后可执行的方法
//             button.text('浏览');
//             window.clearInterval(interval);
//             this.enable();
//         	var data=eval("("+response+")");
//         	alert(data.uploadajax);
//         }
// 	});
// });