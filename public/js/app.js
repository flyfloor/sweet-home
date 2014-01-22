$(document).ready(function(){
	var viewHight = $(document).height(),
			viewWidth = $(document).width(),
			centreZone = {
				"left": viewWidth/2,
				"top": viewHight/2
			};

	//ScrollTop display, Aside position attr
  $(function(){
    $(window).scroll(function(){
      var scrollHight = $(window).scrollTop();
      if (scrollHight > 50) {
        $("aside .tag-editor").css("position", "fixed");
        $screentop = $(".screen-top");
	      if (scrollHight > 800) {
	        $screentop.fadeIn(100);
	      }else{
	        $screentop.fadeOut(100);
	      }
      }else{
        $("aside .tag-editor").css("position", "absolute");
      }
    });
  });

	//Singleton
	var singleton = function(fn){
		var result;
		return result || (result = fn.apply(this, arguments));
	}


	//Navigate active
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

	//Picture
	var Picture = function(){
		var $picLayer = $('<div class="pic-layer">'
												+'<div class="view-mid">'
													+'<a href="javascript:;" id="pre_pic" class="pic-nav icon-angle-left"/>'
													+'<img id="pic_view"/>'
													+'<a href="javascript:;" id="next_pic" class="pic-nav icon-angle-right"/>'
												+'</div></div>');
		return {
			add: function(url){
				if (url != undefined) {
					$picLayer.find("img").attr("src", url);
					$("body").append($picLayer);
				};
			},
			remove: function(){
				$(".pic-layer").remove();
			},
			change: function(){

			},
			existed: function(){
				if($(".pic-layer").length > 0){
					return true;
				}
			}
		}
	}();

	//Loading
	var Loading = function(){
		var $tip = $('<i class="loading icon-spinner icon-spin"/>');
		$tip.css(centreZone);
		return {
			display: function(){
				$("body").append($tip);
			},
			hide: function(){
				$(".loading").remove();
			}
		}
	}();

	
	//Item display
	$(".pic_list img").click(function(){
		var tId = $(this).parents("picture").attr("id");
		$.ajax({
			url: "/pics/" + tId,
			type: "GET",
			dataType: "json",
			beforeSend: function(){
				Loading.display();
			},
			success: function(data){
				Loading.hide();
				Picture.add(data.avatar.url);
			}
		});

	});

	//Item remove
	$(document).click(".pic-layer", function(event){
		if (Picture.existed() === true) {
			console.log(event);
			event.stopPropagation();
			Picture.remove();
		};
	});

	//Delete a blog
	$(".delete-blog").click(function(){
		var $article = $(this).parents("article");
		$.ajax({
			url: "/blogs/" + $article.attr("id"),
			type : "DELETE",
			success: function(data){
				delSucc(data, $article);
			}
		});
		return false;
	});

	//Comment hover for delete
	var $comItem = $(".comments").find(".item"),
			$delCom = $(".delete-comment");
	
	$comItem.hover(function(){
		$(this).find($delCom).stop().fadeIn();
	},function(){
		$(this).find($delCom).stop().fadeOut();
	});
	
	//Delete a comment
	$(document).on("click",".delete-comment", function(){
		var $comment = $(this).parents("li.item");
		$.ajax({
			url: $(this).attr("href"),
			type: "DELETE",
			success: function(data){
				afterDel(data, $comment);
			}
		});
		return false;
	});

	var delSucc = function(data, $dom){
		if (data.success === true) {
			$dom.fadeOut();
		};
	};

	//Like the blog or a picture
	$(".likeIt").click(function(){
		var	$picture = $(this).parents("picture"),
			 	$article = $(this).parents("article"),
				tLength = $article.length || $picture.length,
			 	$count = $(this).siblings(".like-counts"),
				urlRoute,
				tId;

		if (tLength == 0) {
			return false;
		}else{
			if ($article.length > 0) {
				urlRoute = "/blogs/";
				tId = $article.attr("id");
			}
			if ($picture.length > 0) {
				urlRoute = "/pics/";
				tId = $picture.attr("id");
			}
		}

		$.ajax({
			url: urlRoute + tId + "/like",
			type:"POST",
			success: function(data){
				$count.html(data);
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

	//Scroll to top
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

	//Thumb picture's hover action
	var $thumb_info = $(".pic-info");
	$(".index-content picture").hover(function(){
		$(this).find($thumb_info).stop().fadeIn();
	},function(){
		$(this).find($thumb_info).stop().fadeOut();
	});

})