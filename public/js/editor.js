$(document).ready(function(){
	//编辑器
	$(function() {
		$('#editor-tools a').click(function(e) {
			$('#editor-content').focus();
			var data_role = $(this).data('role');
			switch(data_role) {
				case 'h1':
				case 'h2':
				case 'h3':
				case 'p':
					document.execCommand('formatBlock', false, '<' + $(this).data('role') + '>');
					break;
				default:
					document.execCommand($(this).data('role'), false, null);
					break;
			}

			if(data_role === "undo"){
				$("#editor-tools").find(".editor-active").removeClass("editor-active");
			}else{
				if($(this).hasClass("editor-active")){
					$(this).removeClass("editor-active");
				}else{
					$(this).addClass("editor-active");
					if($(this).parents("ul").hasClass("group")){
						console.log("true");
						$(this).parent().siblings("li").children().removeClass("editor-active");
					}
				}
			}
		})
	}); 
})