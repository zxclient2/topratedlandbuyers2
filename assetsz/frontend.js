!function(h){function s(e,t,i){t=void 0===t?"/images/ajax-loader.gif":t,i=void 0!==i?i:"";return this.elem=e,this.image='<img class="gfspinner" src="'+t+'" style="'+i+'" />',this.init=function(){return this.spinner=jQuery(this.image),jQuery(this.elem).after(this.spinner),this},this.destroy=function(){jQuery(this.spinner).remove()},this.init()}window.GFChainedSelects=function(e,t,i,n){var f=this;f.formId=e,f.fieldId=t,f.hideInactive=i,f.alignment=n;var o=h("#field_"+f.formId+"_"+f.fieldId);f.$selects=o.find("select"),f.$complete=o.find(".gf_chain_complete"),f.isDoingConditionalLogic=!1,f.init=function(){gform.addAction("gform_input_change",function(e,t,i){if(-1!=f.$selects.index(e)){var n=h(e).attr("name").split("_")[1];f.populateNextChoices(n,e.value,h(e))}},9),f.$selects.filter(function(){var e=h(this);return e.hasClass("gf_no_options")||e.find("option").length<=1}).toggleSelect(!0,f.hideInactive),gform.addFilter("gform_is_value_match",function(e,t,i){return f.isValueMatch(e,t,i)})},f.populateNextChoices=function(e,t,a){var i=f.getNextInputId(e),l=f.$selects.filter('[name="input_'+i+'"]');if(l.length<=0)return f.resetSelects(a,!0),void f.resizeSelects();if(f.resetSelects(a),t){if(f.hideInactive)var r=new s(h('[name="input_'+e+'" ]'),gformChainedSelectData.spinner,"display:inline-block;vertical-align:middle;margin:-1px 0 0 6px;");else{var c=h('<option value="">'+gformChainedSelectData.strings.loading+"...</option>"),n=2,d=setInterval(function(){c.text(gformChainedSelectData.strings.loading+new Array(n).join(".")),n=3<n?0:n+1},250);c.prependTo(l).prop("selected",!0),l.css({minWidth:l.width()}),c.text(gformChainedSelectData.strings.loading+".")}h.post(gformChainedSelectData.ajaxUrl,{action:"gform_get_next_chained_select_choices",input_id:e,form_id:f.formId,field_id:f.fieldId,value:f.getChainedSelectsValue(),nonce:gformChainedSelectData.nonce},function(e){if(f.hideInactive?r.destroy():(clearInterval(d),c.remove()),e){var t=h.parseJSON(e),n="";if(l.find("option:not(:first)").remove(),t.length<=0)f.resetSelects(a,!0);else{var o=!1;if(h.each(t,function(e,t){var i=t.isSelected?'selected="selected"':"";i&&(o=!0),n+='<option value="'+t.value+'"'+i+">"+t.text+"</option>"}),l.show().append(n),t[0].noOptions){var i=l.find("option:last-child").clone(),s=l.parents("span").nextAll().find("select");s.append(i),s.add(l).addClass("gf_no_options").find("option:last-child").prop("selected",!0)}else l.removeClass("gf_no_options").toggleSelect(!1,f),o&&l.change()}f.resizeSelects()}})}},f.getChainedSelectsValue=function(){var t={};return f.$selects.each(function(){var e=h(this).attr("name").split("_")[1];t[e]=h(this).val()}),t},f.getNextInputId=function(e){var t=parseInt(e.split(".")[1])+1;return t%10==0&&t++,parseInt(e)+"."+t},f.resetSelects=function(e,t){var i=f.$selects.index(e);f.$selects.filter(":gt("+i+")").toggleSelect(!0,f.hideInactive).find("option:not(:first)").remove().val("").change()},f.resizeSelects=function(){if("vertical"==f.alignment){f.$selects.width("auto");var e=0;f.$selects.each(function(){h(this).width()>e&&(e=h(this).width())}),f.$selects.width(e+"px")}},f.toggleCompleted=function(e){e?f.$complete.fadeIn():f.$complete.fadeOut()},f.isValueMatch=function(e,t,i){if(t!=f.formId||i.fieldId!=f.fieldId||f.isDoingConditionalLogic)return e;f.isDoingConditionalLogic=!0,i=h.extend({},i);for(var n=f.getChainedSelectsValue(),o=Object.keys(n).map(function(e){return n[e]}),s=i.value.split("/"),a=0;a<s.length;a++)"*"==s[a]&&(s[a]=o[a]);return s=s.join("/"),o=o.join("/"),e=gf_matches_operation(s,o,i.operator),f.isDoingConditionalLogic=!1,e},h.fn.toggleSelect=function(e,t){return this.prop("disabled",e),void 0!==t&&t&&(e?this.hide():this.show()),this},f.init()}}(jQuery);