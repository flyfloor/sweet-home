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
	var $comment_item = $(".comments").find(".item");
	$comment_item.hover(function(){
		$(this).find(".delete-comment").stop().fadeIn();
	},function(){
		$(this).find(".delete-comment").stop().fadeOut();
	});
	$(document).on("click",".delete-comment", function(){
		var $comment = $(this).parents("li.item");
		$.ajax({
			url: $(this).attr("href"),
			type: "DELETE",
			success: function(data){
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