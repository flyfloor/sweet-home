$(document).ready(function(){

	//Singleton
	var singleton = function(fn){
		var result;
		return result || (result = fn.apply(this, arguments));
	}

	//Navigate
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

	//Delete a blog
	$(".delete-blog").click(function(){
		var $article = $(this).parents("article");
		$.ajax({
			url: "/blogs/" + $article.attr("id"),
			type : "DELETE",
			success: function(data){
				$article.fadeOut();
			}
		});
		return false;
	});

	//Delete a comment
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

	//Like the blog
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

	//Pagination
	$(function(){
		$(".previous_page, .next_page").bind("page_display", function(){
			if ($(this).hasClass("disabled")) {
				$(this).css("display","none");
			};
		});
		$(".previous_page, .next_page").trigger("page_display");
	})

	//Scrolltop display,action
	$(function(){
		$(window).scroll(function(){
			var scrollHight = $(window).scrollTop();
			if (scrollHight > 50) {
				$(".tag-editor").css("position", "fixed");

				if (scrollHight > 800) {
					$(".screen-top").fadeIn(100);
				}else{
					$(".screen-top").fadeOut(100);
				}
			}else{
				$(".tag-editor").css("position", "absolute");
			}
		});
	});

	$(".screen-top").click(function(){
		$("body, html").animate({scrollTop: 0}, 1000);
		return false;
	});

	//Tag part
	var Tag = function(){

		return{
			enabled: function($dom){
				$dom.removeClass("tag-disabled");
				$dom.removeAttr("disabled");
			},

			disabled: function($dom){
				$dom.addClass("tag-disabled");
				$dom.attr("disabled","disabled");
			},
			addTo: function(className, val, $target){
				var tag = document.createElement("tag");
				tag.innerHTML = val;
				tag.className = className;
				$(tag).appendTo($target);
			},
			remove: function($dom){
				$dom.remove();
			},
			refresh: function($save_tag, spliter, $selectTags, $existTags){
				var tags_val = "", tag_token;
				$selectTags.find("tag").each(function(){
					tag_token = $(this).text() + spliter;
					var $selected_tags = $selectTags.children("tag"),
							$exist_tags = $existTags.find("tag");
					for (var i = 0; i < $exist_tags.length; i++) {
						if($(this).text() === $exist_tags.eq(i).text()){
							Tag.disabled($exist_tags.eq(i));
						}
					};
					tags_val += tag_token;
					$save_tag.val(tags_val);
				});
			},
			refreshData: function(){
				this.refresh($("#hid_tag"), "#tag#", $(".selected-tags"), $(".exist-tags"));
			}
		}
	}()

	//Tag init
	Tag.refreshData();

	//Tag actions
	$("#new-tag").bind("input",function(){
		$("#hid_swap").text($(this).val());
	});

	$("#new-tag").on("change", function(event){
		if($(this).val().trim()!= ""){
			Tag.addTo("sld-tag", $(this).val(), $(".selected-tags"));
			Tag.refreshData();
		}
		$(this).val("");
	});

	$("#new-tag").on("keypress", function(event){
		var _keyCode = event.which? event.which : event.keyCode;

		if(_keyCode == 13){
			if($(this).val().trim()!= ""){
				Tag.addTo("sld-tag", $(this).val(), $(".selected-tags"));
				Tag.refreshData();
			}
			$(this).val("");
			return false;
		}
	});

	$(document).on("click", ".selected-tags tag", function(){
		var tagText = $(this).text().trim();
		if(tagText != ""){
			$(".exist-tags").find("tag").each(function(){
				if($(this).text() === tagText){
					Tag.enabled($(this));
				}
			});
			Tag.remove($(this));
			Tag.refreshData();
		}
	});

	$(".exist-tags").children("tag").click(function(){
		if (!$(this).hasClass("tag-disabled")) {
			Tag.addTo("sld-tag", $(this).text(), $(".selected-tags"));			
			Tag.disabled($(this));
			Tag.refreshData();
		};
	});


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