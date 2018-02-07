export default function(Vue){
    Vue.directive("height",{
       inserted(el,binding){
           $(el).height($(window).height() - binding.value)
       }
    });

}