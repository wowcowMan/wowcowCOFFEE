(self["webpackChunkwowcofee_project"]=self["webpackChunkwowcofee_project"]||[]).push([[209],{7972:function(t,e,s){
/*!
  * Bootstrap modal.js v5.3.0-alpha3 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(e,i){t.exports=i(s(1884),s(4130),s(7317),s(632),s(9069),s(5160),s(1437),s(7547))})(0,(function(t,e,s,i,o,a,l,n){"use strict";const d="modal",r="bs.modal",c=`.${r}`,u=".data-api",m="Escape",p=`hide${c}`,h=`hidePrevented${c}`,_=`hidden${c}`,g=`show${c}`,b=`shown${c}`,f=`resize${c}`,w=`click.dismiss${c}`,y=`mousedown.dismiss${c}`,v=`keydown.dismiss${c}`,k=`click${c}${u}`,P="modal-open",C="fade",x="show",D="modal-static",$=".modal.show",M=".modal-dialog",U=".modal-body",L='[data-bs-toggle="modal"]',T={backdrop:!0,focus:!0,keyboard:!0},V={backdrop:"(boolean|string)",focus:"boolean",keyboard:"boolean"};class A extends t{constructor(t,e){super(t,e),this._dialog=s.findOne(M,this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new n,this._addEventListeners()}static get Default(){return T}static get DefaultType(){return V}static get NAME(){return d}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){if(this._isShown||this._isTransitioning)return;const s=e.trigger(this._element,g,{relatedTarget:t});s.defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add(P),this._adjustDialog(),this._backdrop.show((()=>this._showElement(t))))}hide(){if(!this._isShown||this._isTransitioning)return;const t=e.trigger(this._element,p);t.defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove(x),this._queueCallback((()=>this._hideModal()),this._element,this._isAnimated()))}dispose(){e.off(window,c),e.off(this._dialog,c),this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new i({isVisible:Boolean(this._config.backdrop),isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new a({trapElement:this._element})}_showElement(t){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0;const i=s.findOne(U,this._dialog);i&&(i.scrollTop=0),l.reflow(this._element),this._element.classList.add(x);const o=()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,e.trigger(this._element,b,{relatedTarget:t})};this._queueCallback(o,this._dialog,this._isAnimated())}_addEventListeners(){e.on(this._element,v,(t=>{t.key===m&&(this._config.keyboard?this.hide():this._triggerBackdropTransition())})),e.on(window,f,(()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog()})),e.on(this._element,y,(t=>{e.one(this._element,w,(e=>{this._element===t.target&&this._element===e.target&&("static"!==this._config.backdrop?this._config.backdrop&&this.hide():this._triggerBackdropTransition())}))}))}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide((()=>{document.body.classList.remove(P),this._resetAdjustments(),this._scrollBar.reset(),e.trigger(this._element,_)}))}_isAnimated(){return this._element.classList.contains(C)}_triggerBackdropTransition(){const t=e.trigger(this._element,h);if(t.defaultPrevented)return;const s=this._element.scrollHeight>document.documentElement.clientHeight,i=this._element.style.overflowY;"hidden"===i||this._element.classList.contains(D)||(s||(this._element.style.overflowY="hidden"),this._element.classList.add(D),this._queueCallback((()=>{this._element.classList.remove(D),this._queueCallback((()=>{this._element.style.overflowY=i}),this._dialog)}),this._dialog),this._element.focus())}_adjustDialog(){const t=this._element.scrollHeight>document.documentElement.clientHeight,e=this._scrollBar.getWidth(),s=e>0;if(s&&!t){const t=l.isRTL()?"paddingLeft":"paddingRight";this._element.style[t]=`${e}px`}if(!s&&t){const t=l.isRTL()?"paddingRight":"paddingLeft";this._element.style[t]=`${e}px`}}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(t,e){return this.each((function(){const s=A.getOrCreateInstance(this,t);if("string"===typeof t){if("undefined"===typeof s[t])throw new TypeError(`No method named "${t}"`);s[t](e)}}))}}return e.on(document,k,L,(function(t){const i=s.getElementFromSelector(this);["A","AREA"].includes(this.tagName)&&t.preventDefault(),e.one(i,g,(t=>{t.defaultPrevented||e.one(i,_,(()=>{l.isVisible(this)&&this.focus()}))}));const o=s.findOne($);o&&A.getInstance(o).hide();const a=A.getOrCreateInstance(i);a.toggle(this)})),o.enableDismissTrigger(A),l.defineJQueryPlugin(A),A}))},1339:function(t,e,s){"use strict";var i=s(7972),o=s.n(i);e["Z"]={methods:{showModal(){this.modal.show()},hideModal(){this.modal.hide()}},mounted(){this.modal=new(o())(this.$refs.modal)}}},7823:function(t,e,s){"use strict";s.d(e,{Z:function(){return v}});var i=s(3396),o=s(7139);const a={class:"modal fade",id:"delModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},l={class:"modal-dialog",role:"document"},n={class:"modal-content border-0"},d={class:"modal-header bg-danger text-white"},r={class:"modal-title"},c=(0,i._)("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),u={class:"modal-body"},m={class:"text-danger"},p={class:"modal-footer"},h=(0,i._)("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"},"取消 ",-1),_=["disabled"];function g(t,e,s,g,b,f){return(0,i.wg)(),(0,i.iD)("div",a,[(0,i._)("div",l,[(0,i._)("div",n,[(0,i._)("div",d,[(0,i._)("h5",r,[(0,i._)("span",null,"刪除 "+(0,o.zw)(s.item.title),1)]),c]),(0,i._)("div",u,[(0,i.Uk)(" 是否刪除 "),(0,i._)("strong",m,(0,o.zw)(s.item.title),1),(0,i.Uk)(" (刪除後將無法恢復)。 ")]),(0,i._)("div",p,[h,(0,i._)("button",{type:"button",disabled:b.isChecked,class:"btn btn-danger",onClick:e[0]||(e[0]=e=>t.$emit("del-item"))},"確認刪除 ",8,_)])])])],512)}var b=s(1339),f={props:{item:{}},data(){return{modal:"",isChecked:!1}},mixins:[b.Z]},w=s(89);const y=(0,w.Z)(f,[["render",g]]);var v=y},7209:function(t,e,s){"use strict";s.r(e),s.d(e,{default:function(){return Yt}});var i=s(3396),o=s(7139);const a={class:"mt-3"},l={class:"table mt-4"},n=(0,i._)("thead",null,[(0,i._)("tr",null,[(0,i._)("th",{width:"120"},"分類"),(0,i._)("th",{width:"200"},"產品名稱"),(0,i._)("th",{width:"120"},"原價"),(0,i._)("th",{width:"120"},"售價"),(0,i._)("th",{width:"100"},"是否啟用"),(0,i._)("th",{width:"200"},"編輯")])],-1),d={class:"text-right"},r={class:"text-right"},c={key:0,class:"text-success"},u={key:1,class:"text-muted"},m={class:"btn-group"},p=["onClick"],h=["onClick"];function _(t,e,s,_,g,b){const f=(0,i.up)("Loading"),w=(0,i.up)("ProductModal"),y=(0,i.up)("Back-Pagination"),v=(0,i.up)("DelModal");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i.Wm)(f,{active:g.isLoading},null,8,["active"]),(0,i._)("div",a,[(0,i._)("button",{class:"btn btn-primary",type:"button",onClick:e[0]||(e[0]=t=>b.openModal(!0))}," 增加一個產品 ")]),(0,i.Wm)(w,{ref:"productModal",product:g.tempProduct,onUpdateProduct:b.updateProduct},null,8,["product","onUpdateProduct"]),(0,i._)("table",l,[n,(0,i._)("tbody",null,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(g.products,(e=>((0,i.wg)(),(0,i.iD)("tr",{key:e.id},[(0,i._)("td",null,(0,o.zw)(e.category),1),(0,i._)("td",null,(0,o.zw)(e.title),1),(0,i._)("td",d,(0,o.zw)(t.$filters.currency(e.origin_price)),1),(0,i._)("td",r,(0,o.zw)(t.$filters.currency(e.price)),1),(0,i._)("td",null,[e.is_enabled?((0,i.wg)(),(0,i.iD)("span",c,"啟用")):((0,i.wg)(),(0,i.iD)("span",u,"未啟用"))]),(0,i._)("td",null,[(0,i._)("div",m,[(0,i._)("button",{class:"btn btn-outline-primary btn-sm",onClick:t=>b.openModal(!1,e)},"編輯",8,p),(0,i._)("button",{class:"btn btn-outline-danger btn-sm",onClick:t=>b.openDelProductModal(e)},"刪除",8,h)])])])))),128))])]),(0,i.Wm)(y,{pages:g.pagination,onEmitPages:b.getProducts},null,8,["pages","onEmitPages"]),(0,i.Wm)(v,{item:g.tempProduct,ref:"delModal",onDelItem:b.delProduct},null,8,["item","onDelItem"])],64)}s(7658);var g=s(9242);const b={class:"modal fade",id:"exampleModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},f={class:"modal-dialog modal-xl",role:"document"},w={class:"modal-content border-0"},y=(0,i._)("div",{class:"modal-header bg-dark text-white"},[(0,i._)("h5",{class:"modal-title",id:"exampleModalLabel"},[(0,i._)("span",null,"新增產品")]),(0,i._)("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),v={class:"modal-body"},k={class:"row"},P={class:"col-sm-4"},C={class:"mb-3"},x=(0,i._)("label",{for:"image",class:"form-label"},"輸入圖片網址",-1),D={class:"mb-3"},$=(0,i._)("label",{for:"customFile",class:"form-label"},[(0,i.Uk)("或 上傳圖片 "),(0,i._)("i",{class:"fas fa-spinner fa-spin"})],-1),M=["src"],U={key:0,class:"mt-5"},L=["onUpdate:modelValue"],T=["onClick"],V={key:0},A={class:"col-sm-8"},z={class:"mb-3"},E=(0,i._)("label",{for:"title",class:"form-label"},"標題",-1),j={class:"row gx-2"},B={class:"mb-3 col-md-6"},H=(0,i._)("label",{for:"category",class:"form-label"},"分類",-1),S={class:"mb-3 col-md-6"},F=(0,i._)("label",{for:"price",class:"form-label"},"單位",-1),N={class:"row gx-2"},Y={class:"mb-3 col-md-6"},Z=(0,i._)("label",{for:"origin_price",class:"form-label"},"原價",-1),I={class:"mb-3 col-md-6"},O=(0,i._)("label",{for:"price",class:"form-label"},"售價",-1),q=(0,i._)("hr",null,null,-1),R={class:"mb-3"},K=(0,i._)("label",{for:"description",class:"form-label"},"產品描述",-1),W={class:"mb-3"},J={class:"row align-items-center"},Q={class:"input-group w-auto col-3"},G=(0,i._)("label",{for:"acidity",class:"form-label mb-0 me-2 lh-lg"},"酸度",-1),X=(0,i._)("option",{selected:""},"請選擇",-1),tt=["value"],et=(0,i._)("span",{class:"lh-lg"},"/5",-1),st={class:"input-group w-auto col-3"},it=(0,i._)("label",{for:"sweetness",class:"form-label mb-0 me-2 lh-lg"},"甜感",-1),ot=(0,i._)("option",{selected:""},"請選擇",-1),at=["value"],lt=(0,i._)("span",{class:"lh-lg"},"/5",-1),nt=(0,i._)("br",null,null,-1),dt=(0,i._)("label",{for:"flavor",class:"form-label"},"風味",-1),rt=(0,i._)("label",{for:"strategy",class:"form-label"},"沖煮策略",-1),ct=(0,i._)("br",null,null,-1),ut=(0,i._)("label",{for:"temperature"},"水溫",-1),mt=(0,i._)("label",{for:"dripper"},"濾杯",-1),pt=(0,i._)("br",null,null,-1),ht=(0,i._)("label",{for:"dripper"},"粉量",-1),_t=(0,i._)("label",{for:"fine"},"粗細",-1),gt=(0,i._)("br",null,null,-1),bt=(0,i._)("label",{for:"pour"},"斷水",-1),ft={class:"mb-3"},wt={class:"form-check"},yt=(0,i._)("label",{class:"form-check-label",for:"is_enabled"}," 是否啟用 ",-1),vt={class:"modal-footer"},kt=(0,i._)("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1),Pt=["disabled"];function Ct(t,e,s,a,l,n){return(0,i.wg)(),(0,i.iD)("div",b,[(0,i._)("div",f,[(0,i._)("div",w,[y,(0,i._)("div",v,[(0,i._)("div",k,[(0,i._)("div",P,[(0,i._)("div",C,[x,(0,i.wy)((0,i._)("input",{type:"text",class:"form-control",id:"image","onUpdate:modelValue":e[0]||(e[0]=t=>l.tempProduct.imageUrl=t),placeholder:"請輸入圖片連結"},null,512),[[g.nr,l.tempProduct.imageUrl]])]),(0,i._)("div",D,[$,(0,i._)("input",{type:"file",id:"customFile",class:"form-control",ref:"fileInput",onChange:e[1]||(e[1]=(...t)=>n.uploadFile&&n.uploadFile(...t))},null,544)]),(0,i._)("img",{class:"img-fluid",src:l.tempProduct.imageUrl,alt:""},null,8,M),l.tempProduct.images?((0,i.wg)(),(0,i.iD)("div",U,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(l.tempProduct.images,((t,e)=>((0,i.wg)(),(0,i.iD)("div",{class:"mb-3 input-group",key:e},[(0,i.wy)((0,i._)("input",{type:"url",class:"form-control form-control","onUpdate:modelValue":t=>l.tempProduct.images[e]=t,placeholder:"請輸入連結"},null,8,L),[[g.nr,l.tempProduct.images[e]]]),(0,i._)("button",{type:"button",class:"btn btn-outline-danger",onClick:t=>l.tempProduct.images.splice(e,1)}," 移除 ",8,T)])))),128)),l.tempProduct.images[l.tempProduct.images.length-1]||!l.tempProduct.images.length?((0,i.wg)(),(0,i.iD)("div",V,[(0,i._)("button",{class:"btn btn-outline-primary btn-sm d-block w-100",onClick:e[2]||(e[2]=t=>l.tempProduct.images.push(""))}," 新增圖片 ")])):(0,i.kq)("",!0)])):(0,i.kq)("",!0)]),(0,i._)("div",A,[(0,i._)("div",z,[E,(0,i.wy)((0,i._)("input",{type:"text",class:"form-control",id:"title","onUpdate:modelValue":e[3]||(e[3]=t=>l.tempProduct.title=t),placeholder:"請輸入標題"},null,512),[[g.nr,l.tempProduct.title]])]),(0,i._)("div",j,[(0,i._)("div",B,[H,(0,i.wy)((0,i._)("input",{type:"text",class:"form-control",id:"category","onUpdate:modelValue":e[4]||(e[4]=t=>l.tempProduct.category=t),placeholder:"請輸入分類"},null,512),[[g.nr,l.tempProduct.category]])]),(0,i._)("div",S,[F,(0,i.wy)((0,i._)("input",{type:"text",class:"form-control",id:"unit","onUpdate:modelValue":e[5]||(e[5]=t=>l.tempProduct.unit=t),placeholder:"請輸入單位"},null,512),[[g.nr,l.tempProduct.unit]])])]),(0,i._)("div",N,[(0,i._)("div",Y,[Z,(0,i.wy)((0,i._)("input",{type:"number",class:"form-control",id:"origin_price","onUpdate:modelValue":e[6]||(e[6]=t=>l.tempProduct.origin_price=t),placeholder:"請輸入原價"},null,512),[[g.nr,l.tempProduct.origin_price,void 0,{number:!0}]])]),(0,i._)("div",I,[O,(0,i.wy)((0,i._)("input",{type:"number",class:"form-control",id:"price","onUpdate:modelValue":e[7]||(e[7]=t=>l.tempProduct.price=t),placeholder:"請輸入售價"},null,512),[[g.nr,l.tempProduct.price,void 0,{number:!0}]])])]),q,(0,i._)("div",R,[K,(0,i.wy)((0,i._)("textarea",{type:"text",class:"form-control",id:"description","onUpdate:modelValue":e[8]||(e[8]=t=>l.tempProduct.description=t),placeholder:"請輸入產品描述"},null,512),[[g.nr,l.tempProduct.description]])]),(0,i._)("div",W,[(0,i._)("div",J,[(0,i._)("div",Q,[G,(0,i.wy)((0,i._)("select",{"onUpdate:modelValue":e[9]||(e[9]=t=>l.content.taste.acidity=t),class:"form-select d-inline-block w-auto me-1","aria-label":"Default select example",id:"acidity",onChange:e[10]||(e[10]=(...t)=>n.addContent&&n.addContent(...t))},[X,((0,i.wg)(),(0,i.iD)(i.HY,null,(0,i.Ko)(5,((t,e)=>(0,i._)("option",{value:t,key:e},(0,o.zw)(t),9,tt))),64))],544),[[g.bM,l.content.taste.acidity]]),et]),(0,i._)("div",st,[it,(0,i.wy)((0,i._)("select",{"onUpdate:modelValue":e[11]||(e[11]=t=>l.content.taste.sweetness=t),class:"form-select d-inline-block w-auto me-1","aria-label":"Default select example",id:"sweetness",onChange:e[12]||(e[12]=(...t)=>n.addContent&&n.addContent(...t))},[ot,((0,i.wg)(),(0,i.iD)(i.HY,null,(0,i.Ko)(5,((t,e)=>(0,i._)("option",{value:t,key:e},(0,o.zw)(t),9,at))),64))],544),[[g.bM,l.content.taste.sweetness]]),lt])]),nt,dt,(0,i.wy)((0,i._)("textarea",{type:"text",class:"form-control",id:"flavor","onUpdate:modelValue":e[13]||(e[13]=t=>l.content.flavor=t),placeholder:"請輸入風味內容",onChange:e[14]||(e[14]=(...t)=>n.addContent&&n.addContent(...t))},null,544),[[g.nr,l.content.flavor]]),rt,ct,ut,(0,i.wy)((0,i._)("input",{type:"text","onUpdate:modelValue":e[15]||(e[15]=t=>l.content.strategy.temperature=t),class:"me-2",onChange:e[16]||(e[16]=(...t)=>n.addContent&&n.addContent(...t))},null,544),[[g.nr,l.content.strategy.temperature]]),mt,(0,i.wy)((0,i._)("input",{type:"text","onUpdate:modelValue":e[17]||(e[17]=t=>l.content.strategy.dripper=t),onChange:e[18]||(e[18]=(...t)=>n.addContent&&n.addContent(...t))},null,544),[[g.nr,l.content.strategy.dripper]]),pt,ht,(0,i.wy)((0,i._)("input",{type:"text","onUpdate:modelValue":e[19]||(e[19]=t=>l.content.strategy.amount=t),class:"me-2",onChange:e[20]||(e[20]=(...t)=>n.addContent&&n.addContent(...t))},null,544),[[g.nr,l.content.strategy.amount]]),_t,(0,i.wy)((0,i._)("input",{type:"text","onUpdate:modelValue":e[21]||(e[21]=t=>l.content.strategy.fine=t),onChange:e[22]||(e[22]=(...t)=>n.addContent&&n.addContent(...t))},null,544),[[g.nr,l.content.strategy.fine]]),gt,bt,(0,i.wy)((0,i._)("textarea",{type:"text",class:"form-control",id:"content","onUpdate:modelValue":e[23]||(e[23]=t=>l.content.strategy.pour=t),placeholder:"請輸入沖煮說明",onChange:e[24]||(e[24]=(...t)=>n.addContent&&n.addContent(...t))},null,544),[[g.nr,l.content.strategy.pour]])]),(0,i._)("div",ft,[(0,i._)("div",wt,[(0,i.wy)((0,i._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":e[25]||(e[25]=t=>l.tempProduct.is_enabled=t),"true-value":1,"false-value":0,id:"is_enabled"},null,512),[[g.e8,l.tempProduct.is_enabled]]),yt])])])])]),(0,i._)("div",vt,[kt,(0,i._)("button",{type:"button",class:"btn btn-primary",disabled:l.isChecked,onClick:e[26]||(e[26]=e=>t.$emit("update-product",l.tempProduct))}," 確認 ",8,Pt)])])])],512)}var xt=s(1339),Dt={props:{product:{type:Object,default(){return{}}}},data(){return{modal:{},tempProduct:{content:""},content:{taste:{acidity:"請選擇",sweetness:"請選擇"},flavor:"",strategy:{temperature:"",dripper:"",amount:"",fine:"",pour:""}},isChecked:!1}},watch:{product(){this.tempProduct=this.product,this.tempProduct.content?this.content=JSON.parse(this.tempProduct.content):this.content={taste:{acidity:"請選擇",sweetness:"請選擇"},flavor:"",strategy:{temperature:"",dripper:"",amount:"",fine:"",pour:""}},this.tempProduct.images||(this.tempProduct.images=[])}},methods:{uploadFile(){const t=this.$refs.fileInput.files[0],e=new FormData;e.append("file-to-upload",t);const s="https://vue3-course-api.hexschool.io/api/wowcowman-api/admin/upload";this.$http.post(s,e).then((t=>{console.log(t.data),t.data.success&&(this.tempProduct.imageUrl=t.data.imageUrl)}))},addContent(){this.tempProduct.content=JSON.stringify(this.content)}},mixins:[xt.Z]},$t=s(89);const Mt=(0,$t.Z)(Dt,[["render",Ct]]);var Ut=Mt,Lt=s(7823);const Tt={"aria-label":"Page navigation example"},Vt={class:"pagination justify-content-center"},At=(0,i._)("li",{class:"page-item"},[(0,i._)("a",{class:"page-link",href:"#","aria-label":"Previous"},[(0,i._)("span",{"aria-hidden":"true"},"«")])],-1),zt=["onClick"],Et=(0,i._)("li",{class:"page-item"},[(0,i._)("a",{class:"page-link",href:"#","aria-label":"Next"},[(0,i._)("span",{"aria-hidden":"true"},"»")])],-1);function jt(t,e,s,a,l,n){return(0,i.wg)(),(0,i.iD)("nav",Tt,[(0,i._)("ul",Vt,[At,((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(s.pages.total_pages,(t=>((0,i.wg)(),(0,i.iD)("li",{class:(0,o.C_)(["page-item",{active:t===s.pages.current_page}]),key:t},[(0,i._)("a",{class:"page-link",href:"#",onClick:(0,g.iM)((e=>n.updatePage(t)),["prevent"])},(0,o.zw)(t),9,zt)],2)))),128)),Et])])}var Bt={props:["pages"],methods:{updatePage(t){this.$emit("emit-pages",t)}}};const Ht=(0,$t.Z)(Bt,[["render",jt]]);var St=Ht,Ft={components:{ProductModal:Ut,DelModal:Lt.Z,BackPagination:St},data(){return{products:[],pagination:{},tempProduct:{},isNew:!1,isLoading:!1}},inject:["emitter"],methods:{getProducts(t=1){const e=`https://vue3-course-api.hexschool.io/api/wowcowman-api/admin/products/?page=${t}`;this.isLoading=!0,this.$http.get(e).then((t=>{this.isLoading=!1,t.data.success&&(console.log(t.data),this.products=t.data.products,this.pagination=t.data.pagination)}))},openModal(t,e){this.tempProduct=t?{}:{...e},this.isNew=t;const s=this.$refs.productModal;s.showModal()},openDelProductModal(t){this.tempProduct={...t};const e=this.$refs.delModal;e.showModal()},delProduct(){const t=`https://vue3-course-api.hexschool.io/api/wowcowman-api/admin/product/${this.tempProduct.id}`;this.$http.delete(t).then((t=>{console.log(t.data);const e=this.$refs.delModal;e.hideModal(),this.getProducts()}))},updateProduct(t){this.tempProduct=t;let e="https://vue3-course-api.hexschool.io/api/wowcowman-api/admin/product",s="post";this.isNew||(e=`https://vue3-course-api.hexschool.io/api/wowcowman-api/admin/product/${t.id}`,s="put");const i=this.$refs.productModal;i.isChecked=!0,this.$http[s](e,{data:this.tempProduct}).then((t=>{console.log(t),i.isChecked=!1,i.hideModal(),t.data.success?(this.getProducts(),this.emitter.emit("push-message",{style:"success",title:"更新成功"})):this.emitter.emit("push-message",{style:"danger",title:"更新失敗",content:t.data.message.join("、")})}))}},created(){this.getProducts()}};const Nt=(0,$t.Z)(Ft,[["render",_]]);var Yt=Nt}}]);
//# sourceMappingURL=209.a596ef29.js.map