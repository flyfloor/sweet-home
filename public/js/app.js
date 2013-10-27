$(document).ready(function(){
	
	//导航选中
	var path = document.location.pathname;
	var pathArray = path.split("/");
	if(path === "/"){
		$(".main-nav").children("li:first").attr("class", "active");
	}else{
		for (var i = 0; i < pathArray.length; i++) {
			$(".main-nav").find("a[href*='"+pathArray[i] + "']")
													.parent("li").attr("class", "active");
		};
	}

	//评论
	$("#form_comment").submit(function(data){
		var articleId = $(this).parents("comment")
													.siblings("article")
													.attr("id");
		$.ajax({
			url: "/blogs/" + articleId + "/comments",
			type: "POST",
			data: $(this).serialize(),
			dataType: "json",
			success: function(data){
				$('<li class="comment">'+
						'<p>'+data.commenter+'</p>'+
						'<p>'+data.content+'</p>'+
						'<p><a class="delete-comment" href="/blogs/'+articleId+'/comments/'+data.id+'">删除</a></p>'+
					'</li>').appendTo("ul.comment");
				$("#comment_commenter,#comment_content").val("");
			}
		});
		return false;
	});

	//删除文章
	$(".delete-blog").click(function(){
		var $article = $(this).parents("article");
		$.ajax({
			url: "/blogs/" + $article.attr("id"),
			type : "DELETE",
			beforeSend: function(data){
				$article.fadeOut();
			}
		});
		return false;
	});

	//删除评论
	$(document).on("click",".delete-comment", function(){
		var $comment = $(this).parents("li.comment");
		$.ajax({
			url: $(this).attr("href"),
			type: "DELETE",
			beforeSend: function(data){
				$comment.fadeOut();
			}
		});
		return false;
	});


	//喜欢
	$(".article-content a.like-count").click(function(){
		var articleId = $("article").attr("id");
		$.ajax({
			url:"/blogs/"+articleId+"/like",
			type:"POST",
			success: function(data){
				$("span.like-nums").html(data);
			}
		});
		return false;
	});

	//编辑内容显示
	$(function(){
		var blog_content = document.getElementById('blog_content');
		if(blog_content != null){
			var content_data = blog_content.innerHTML.replace(/&lt;/gi,"<")
																								.replace(/&gt;/gi, ">");
			$("#editor-content").html(content_data);
		};
	});

	//编辑器内容change，保存
	$("#editor-content").bind("input", function(){
		$("#blog_content").html($(this).html());
	});

	//首页、末页分页显示
	$(function(){
		$(".previous_page, .next_page").bind("whetherDisplay", function(){
			if ($(this).hasClass("disabled")) {
				$(this).css("display","none");
			};
		});
		$(".previous_page, .next_page").trigger("whetherDisplay");
	})


	//滚动到顶部
	$(function(){
		$(window).scroll(function(){
			if ($(window).scrollTop() > 800) {
				$(".screen-top").fadeIn(100);
			}else{
				$(".screen-top").fadeOut(100);
			}
		});
	});

	$(".screen-top").click(function(){
		$("body, html").animate({scrollTop: 0}, 1000);
		return false;
	});

	// //对话框居中
	// $(function(){
	// 	var $dialog = $(".dialog");
	// 	elem_in_center($dialog); 
	// 	$(window).resize(function(){
	// 		elem_in_center($dialog);
	// 	});
	// })

	// //dom居中
	// function elem_in_center($element){
	// 	var leftOffset, topOffset,
	// 			screenWidth = $(window).width(),
	// 			screenHeight = $(window).height();

	// 	leftOffset = (screenWidth - $element.width())/2;
	// 	topOffset = (screenHeight - $element.height())/2;
	// 	$element.css({left: leftOffset+"px", top : topOffset+"px"});
	// }

	// $("#add_link_btn").click(function(){
	// 	var link_data, 
	// 			link_text_data = $("#link_text").val(),
	// 			link_url_data = $("#link_url").val(),
	// 			$blog_content = $("textarea.blog-content");
	// 			blog_content_data = $blog_content.val();
		
	// 	if(link_url_data != ""){
	// 		if(link_text_data != ""){
	// 			link_data = link_text_data;
	// 		}else{
	// 			link_data = link_url_data;
	// 		}

	// 		$blog_content.insertContent('<a href="' +link_url_data+ '" target="_blank">' 
	// 										+link_data+ '</a>');
	// 	}
	// 	close_dialog_window($(".add-link-dialog"));

	// });

	// $(".close-dialog").click(function(){
	// 	close_dialog_window($(this).parents(".dialog"));
	// });

	// $("#add_link_dia_btn").click(function(){
	// 	$("#link_text").val("");
	// 	$("#link_url").val("http://");
	// 	open_dialog_window($(".add-link-dialog"));
	// });

	// function close_dialog_window($dialog){
	// 	$dialog.css({"visibility":"hidden", "display":"none"});
	// }

	// function open_dialog_window($dialog){
	// 	$dialog.css({"visibility":"visible", "display":"block"});
	// }

	//添加内容到textarea光标处
	$(function(){  
    (function($){  
      $.fn.extend({  
        insertContent:function(myValue, t){  
          var $t = $(this)[0];
          //ie下  
          if(document.selection){  
            this.focus();  
            var sel = document.selection.createRange();  
            sel.text = myValue;  
            this.focus();  
            sel.moveStart('character', -l);  
            var wee = sel.text.length;  
            if(arguments.length == 2) {  
              var l = $t.value.length;  
              sel.moveEnd("character", wee + t);  
              t <= 0 ? sel.moveStart("character", wee - 2 * t  
                        - myValue.length) : sel.moveStart(  
                        "character", wee - t - myValue.length);  
              sel.select();  
            }  
          }else if($t.selectionStart || $t.selectionStart == '0'){  
		        var startPos = $t.selectionStart;  
		        var endPos = $t.selectionEnd;  
		        var scrollTop = $t.scrollTop;  
		        $t.value = $t.value.substring(0, startPos)  
				                + myValue  
				                + $t.value.substring(endPos, $t.value.length);  
		        this.focus();  
		        $t.selectionStart = startPos + myValue.length;  
		        $t.selectionEnd = startPos + myValue.length;  
		        $t.scrollTop = scrollTop;  
		        if(arguments.length == 2){  
	            $t.setSelectionRange(startPos - t, $t.selectionEnd + t);  
	            this.focus();  
		        }  
	        }else{  
            this.value += myValue;  
            this.focus();  
	        }  
				}
			})	  
		})(jQuery);   
	}); 


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


	
	// var $upload_form = $("#upload_pic_form");
	// $upload_form.on('submit', function(){
		
	// });
	
	//

	$(function(){
		$(".tag-tokens .tag-token").each(function(){
			disableTag($(this));
		});
		refreshAuthorTags();
	});

	$(".new-tag").bind("input",function(){
		$("#hidden_swap_tag").text($(this).val());
		$(this).css("width",$(this).val().length*16);
	});


	$(".new-tag").on("keypress", function(event){
		var _keyCode = event.which? event.which : event.keyCode;

		if(_keyCode == 8 && $(this).val() == ""){
			var $last_tag = $(".tag-tokens").children(".tag-token:last");
			enableTag($last_tag);
			$last_tag.remove();
		}else if(_keyCode == 13){
			if($("#hidden_swap_tag").text() != "") {
				$(this).val("").css("width", "60");

				makeTagToken($(this));
			};
			return false;
		}
		refreshAuthorTags();
	});

	$(".new-tag").on("change", function(event){
		$(this).val("").css("width", "60");

		makeTagToken($(this));
	});

	function makeTagToken(dom){
		var $new_tag_token = $("<span class='tag-token'>"+$("#hidden_swap_tag").text()+"</span>");
		$new_tag_token.insertBefore(dom.parents(".create-tags"));
	
		$("#hidden_swap_tag").val("");
		disableTag($new_tag_token);

		
		refreshAuthorTags();
	}
	


	$(document).on("click", ".tag-tokens .tag-token", function(){
		enableTag($(this));
		$(this).remove();

		refreshAuthorTags();
	});

	$(".exist-tags").children(".tag-token").click(function(){
		if (!$(this).hasClass("tag-disabled")) {
			$("<span class='tag-token'>"+$(this).text()+"</span>").insertBefore($(".create-tags"));
			
			$(this).addClass("tag-disabled");
			$(this).attr("disabled", "disabled");
			refreshAuthorTags();
		};
	});


	function disableTag(tag){
		var $exist_tags = $(".exist-tags").children(".tag-token");
		for(var i=0; i < $exist_tags.length; i++){
			var $disabled_tag = $(".exist-tags").children(".tag-token:eq("+i+")");
			if(tag.text() === $disabled_tag.text()){
				$disabled_tag.addClass("tag-disabled");
				$disabled_tag.attr("disabled", "disabled");
			}
		}

	}

	function enableTag(tag){
		var $exist_tags = $(".exist-tags").children(".tag-token");
		for(var i=0; i < $exist_tags.length; i++){
			var $disabled_tag = $(".exist-tags").children(".tag-token:eq("+i+")");
			if(tag.text() === $disabled_tag.text()){
				$disabled_tag.removeClass("tag-disabled");
				$disabled_tag.removeAttr("disabled");
			}
		}
	}

	function refreshAuthorTags(){
		var author_tags = "";
		$(".tag-tokens .tag-token").each(function(index){
			author_tags += $(this).text() + "#tag#";
		});

		$("#author_tags").val(author_tags);
	}


	$(".subcheck").on("keypress", stopSubmit); 

	function stopSubmit(event){
		var _keyCode = event.which? event.which : event.keyCode;
		if(_keyCode == 13){
			if(event && event.preventDefault){
				event.preventDefault();
			}else{
				window.event.returnValue = false;
			}
			return false;
		}
	}

})