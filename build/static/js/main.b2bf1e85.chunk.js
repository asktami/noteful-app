(this["webpackJsonpnoteful-react-client"]=this["webpackJsonpnoteful-react-client"]||[]).push([[0],{29:function(e,t,r){},30:function(e,t,r){},37:function(e,t,r){"use strict";r.r(t);var n=r(1),a=r.n(n),o=r(23),s=r.n(o),i=r(8),c=(r(29),r(19)),l=r(4),d=r(5),h=r(7),u=r(6),j=r(2),f=(r(30),{DATASOURCE:"postgresql",NOTES_ENDPOINT:"https://asktami-noteful-api.herokuapp.com/api/notes",FOLDERS_ENDPOINT:"https://asktami-noteful-api.herokuapp.com/api/folders",API_KEY:"2934a46e-eec9-11e9-81b4-2a2ae2dbcce4"}),p=a.a.createContext({folders:[],notes:[],deleteNote:function(){},addNote:function(){},addFolder:function(){},addErrorNotes:function(){},addErrorFolders:function(){},notesError:function(){},updateFolders:function(){},updateNotes:function(){},handleClickDeleteFolder:function(){}}),m=r(0),b=function(e){return Object(m.jsxs)("header",{children:[Object(m.jsx)("span",{children:Object(m.jsx)("h1",{children:Object(m.jsx)(i.b,{to:"/",children:"Noteful"})})}),Object(m.jsxs)("span",{children:["a React app",Object(m.jsx)("br",{}),"(everything takes a couple of seconds to load)"]})]})},O=function(e){return Object(m.jsxs)("footer",{children:["\xa9 2019"," ",Object(m.jsx)("a",{href:"http://www.asktami.com",target:"_blank",rel:"noopener noreferrer",children:"Tami Williams"})]})},x=function(e){Object(h.a)(r,e);var t=Object(u.a)(r);function r(e){var n;return Object(l.a)(this,r),(n=t.call(this,e)).state={hasError:!1},n}return Object(d.a)(r,[{key:"componentDidCatch",value:function(e,t){}},{key:"render",value:function(){return this.state.hasError?Object(m.jsx)("h2",{children:"Could not display this folder."}):this.props.children}}],[{key:"getDerivedStateFromError",value:function(e){return{hasError:!0}}}]),r}(a.a.Component),v=function(e){var t,r=Object(n.useContext)(p),a=r.notes,o=r.folders,s=r.handleClickDeleteFolder;return t="postgresql"===f.DATASOURCE?parseInt(e.match.params.id_folder):e.match.params.id_folder,Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("header",{children:Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("h2",{children:"Folders"}),"\xa0\xa0",Object(m.jsx)(i.c,{to:"/add-folder",children:Object(m.jsx)("button",{className:"btn-add",children:"+"})}),"\xa0\xa0",void 0!==e.match.params.id_folder?Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(i.c,{to:"/edit-folder/".concat(e.match.params.id_folder),children:Object(m.jsx)("button",{className:"btn-edit",children:"\u270e"})}),"\xa0\xa0",Object(m.jsx)("button",{className:"btn-delete",onClick:function(){return s(t,e)},children:"-"})]}):null]})}),Object(m.jsx)("ul",{children:o.map((function(e){return Object(m.jsx)("li",{className:e.id===t?" active":null,children:Object(m.jsx)(x,{children:Object(m.jsxs)(i.c,{to:"/folders/".concat(e.id),children:[Object(m.jsx)("span",{role:"img","aria-label":"Folder",children:"\ud83d\udcc2"}),"\xa0",e.name,"\xa0(",a.filter((function(t){return t.id_folder===e.id})).length,")"]})})},e.id)}))})]})},E=function(e){var t,r=Object(n.useContext)(p),a=r.folders,o=r.notes;t="postgresql"===f.DATASOURCE?parseInt(e.match.params.noteId):e.match.params.noteId;var s=o?o.find((function(e){return e.id===t})):"";if(!s)return"Sorry, no note found.";var c=s.id_folder,l=a.filter((function(e){return e.id===c}));return Object(m.jsx)(m.Fragment,{children:l?l.map((function(t){return Object(m.jsx)("header",{children:Object(m.jsxs)("h2",{children:[t.name,Object(m.jsx)("br",{}),Object(m.jsx)(i.c,{to:"/edit-folder/".concat(t.id),children:Object(m.jsx)("button",{className:"btn-edit",children:"\u270e"})}),Object(m.jsx)("br",{}),Object(m.jsx)("button",{className:"btn-save",onClick:e.history.goBack,children:"Go Back"})]})},t.id)})):null})},N=r(9),g=function(e){Object(h.a)(r,e);var t=Object(u.a)(r);function r(e){var n;return Object(l.a)(this,r),(n=t.call(this,e)).state={hasError:!1},n}return Object(d.a)(r,[{key:"componentDidCatch",value:function(e,t){}},{key:"render",value:function(){return this.state.hasError?Object(m.jsx)("h2",{children:"Could not display this note."}):this.props.children}}],[{key:"getDerivedStateFromError",value:function(e){return{hasError:!0}}}]),r}(a.a.Component),C=function(e){Object(h.a)(r,e);var t=Object(u.a)(r);function r(){var e;Object(l.a)(this,r);for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).handleClickDelete=function(t){t.preventDefault();var r=e.props.note.id;fetch(f.NOTES_ENDPOINT+"/".concat(r),{method:"DELETE",headers:{"content-type":"application/json",authorization:"Bearer ".concat(f.API_KEY)}}).then((function(e){return e.ok&&"404"!==e.status?e.json():e.json().then((function(t){throw e.status}))})).then((function(t){e.context.deleteNote(r),e.props.location.pathname.includes("/notes/")&&e.props.history.push("/"),e.props.location.pathname.includes("/folders/")&&e.props.history.push(e.props.location.pathname)})).catch((function(t){404!==t&&e.context.addErrorNotes(t),404===t&&(e.context.deleteNote(r),e.props.location.pathname.includes("/notes/")&&e.props.history.push("/"),e.props.location.pathname.includes("/folders/")&&e.props.history.push(e.props.location.pathname))}))},e}return Object(d.a)(r,[{key:"render",value:function(){return Object(m.jsxs)("div",{className:"note-item",children:[this.context.notesError&&Object(m.jsx)("p",{className:"error",children:this.context.notesError.value}),Object(m.jsx)(i.c,{to:{pathname:"/notes/".concat(this.props.note.id),props:this.props},children:Object(m.jsx)("h3",{children:this.props.note.name})}),Object(m.jsxs)("div",{className:"button-container",children:[Object(m.jsxs)("span",{children:["Modified on"," ",Object(m.jsxs)("span",{className:"note-datemod",children:[" ",this.props.note.modified?this.props.note.modified.toString().split("T",1)[0]:""]})]}),Object(m.jsxs)("span",{children:[Object(m.jsx)(i.c,{to:"/edit-note/".concat(this.props.note.id),children:Object(m.jsx)("button",{className:"btn-edit-note",children:"\u270e"})}),"\xa0\xa0\xa0",Object(m.jsx)("button",{className:"btn-delete-note",onClick:this.handleClickDelete,children:"-"})]})]})]})}}]),r}(a.a.Component);C.contextType=p;var F=function(e){var t,r=Object(n.useContext)(p).notes;t="postgresql"===f.DATASOURCE?parseInt(e.match.params.id_folder):e.match.params.id_folder;var a=e.match.params.id_folder?r.filter((function(e){return e.id_folder===t})):r;return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)("header",{children:[Object(m.jsx)("h2",{children:"Notes"}),"\xa0\xa0",Object(m.jsx)(i.c,{to:{pathname:"/add-note",state:{id_folder:e.match.params.id_folder}},children:Object(m.jsx)("button",{className:"btn-add",children:"+"})})]}),a.length>0?a.map((function(t){return Object(m.jsx)("section",{children:Object(m.jsx)(g,{children:Object(m.jsx)("div",{className:"note",children:Object(m.jsx)(C,Object(N.a)({note:t},e))})})},t.id)})):Object(m.jsx)("section",{className:"no-border",children:Object(m.jsx)("div",{className:"note",children:"No notes in this folder."})})]})},S=function(e){var t,r=Object(n.useContext)(p).notes;t="postgresql"===f.DATASOURCE?parseInt(e.match.params.noteId):e.match.params.noteId;var a=r.find((function(e){return e.id===t}))||{};return Object(m.jsx)("section",{children:Object(m.jsxs)("div",{className:"note",children:[Object(m.jsx)(C,Object(N.a)(Object(N.a)({},e),{},{note:a})),Object(m.jsx)("p",{className:"note-content",children:a.content})]})})},y=r(12);function _(e){return e.message?Object(m.jsx)("div",{className:"error",id:e.id,children:e.message}):Object(m.jsx)(m.Fragment,{})}var k=function(e){Object(h.a)(r,e);var t=Object(u.a)(r);function r(){var e;Object(l.a)(this,r);for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).state={apiError:null,formValid:!1,errorCount:null,name:"",errors:{name:"You must enter a folder name"}},e.updateErrorCount=function(){var t=e.state.errors,r=0;Object.values(t).forEach((function(e){e.length>0&&r++})),e.setState({errorCount:r});var n=0===r;e.setState({formValid:n})},e.validateField=function(t,r){var n="";"name"===t&&(0===r.trim().length?n="Folder name is required":r.trim().length<3&&(n="Folder name must be at least 3 characters long"));var a=Object(N.a)({},e.state).errors;a[t]=n,e.setState({errors:a})},e.handleChange=function(t){var r=t.target,n=r.name,a=r.value;e.setState(Object(y.a)({},n,a.trim())),e.validateField(n,a),e.updateErrorCount()},e.handleClickCancel=function(){e.props.history.push("/")},e.handleSubmit=function(t){if(t.preventDefault(),!(e.state.errorCount>0)){var r=t.target.name,n={name:r.value};e.setState({apiError:null}),fetch(f.FOLDERS_ENDPOINT,{method:"POST",body:JSON.stringify(n),headers:{"content-type":"application/json",Authorization:"Bearer ".concat(f.API_KEY)}}).then((function(e){return e.ok?e.json():e.json().then((function(e){throw e}))})).then((function(t){r.value="",e.context.addFolder(t),e.props.history.push("/folders/".concat(t.id))})).catch((function(t){e.setState({apiError:t})}))}},e}return Object(d.a)(r,[{key:"render",value:function(){var e=this.state.errors;return this.state.apiError?Object(m.jsx)("p",{className:"error",children:this.state.apiError}):Object(m.jsxs)("form",{className:"addFolderForm",onSubmit:this.handleSubmit,noValidate:!0,children:[Object(m.jsxs)("fieldset",{children:[Object(m.jsx)("legend",{children:"New Folder"}),Object(m.jsx)("label",{htmlFor:"name",children:"Name"}),Object(m.jsx)("input",{type:"text",id:"name",name:"name","aria-label":"Folder Name",required:!0,"aria-required":"true","aria-describedby":"folderNameError","aria-invalid":"true",onChange:this.handleChange}),e.name.length>0&&Object(m.jsx)(_,{message:e.name,id:"folderNameError"}),Object(m.jsx)("br",{}),Object(m.jsx)("button",{className:"btn-cancel",onClick:this.handleClickCancel,children:"Cancel"})," ",Object(m.jsx)("button",{className:"btn-save",disabled:!1===this.state.formValid,children:"Save Folder"})]}),null!==this.state.errorCount?Object(m.jsxs)("p",{className:"form-status",children:["Form is ",this.state.formValid?"complete  \u2705":"incomplete  \u274c"]}):null]})}}]),r}(a.a.Component);k.contextType=p;var D=k,T=function(e){Object(h.a)(r,e);var t=Object(u.a)(r);function r(){var e;Object(l.a)(this,r);for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).state={apiError:null,formValid:!1,errorCount:null,id_folder:e.props.location.state.id_folder||"",name:"",content:"",errors:{id_folder:!e.props.location.state.id_folder&&"You must select a folder",name:"You must enter a note title",content:"You must enter a description"}},e.updateErrorCount=function(){var t=e.state.errors,r=0;Object.values(t).forEach((function(e){e.length>0&&r++})),e.setState({errorCount:r});var n=0===r;e.setState({formValid:n})},e.validateField=function(t,r){var n="";"name"===t&&(0===r.length?n="Note title is required":r.length<3&&(n="Note title must be at least 3 characters long")),"id_folder"===t&&0===r.length&&(n="You must select a folder"),"content"===t&&(0===r.length?n="You must enter a description":r.length<5&&(n="The description must be at least 5 characters long"));var a=Object(N.a)({},e.state).errors;a[t]=n,e.setState({errors:a})},e.handleChange=function(t){var r=t.target,n=r.name,a=r.value;e.setState(Object(y.a)({},n,a.trim())),e.validateField(n,a.trim()),e.updateErrorCount()},e.handleClickCancel=function(){e.props.history.push("/")},e.handleSubmit=function(t){if(t.preventDefault(),!(e.state.errorCount>0)){var r=t.target,n=r.id_folder,a=r.name,o=r.content,s={id_folder:n.value,name:a.value,content:o.value,modified:new Date(Date.UTC())};e.setState({apiError:null}),fetch(f.NOTES_ENDPOINT,{method:"POST",body:JSON.stringify(s),headers:{"content-type":"application/json",Authorization:"Bearer ".concat(f.API_KEY)}}).then((function(e){return e.ok?e.json():e.json().then((function(e){throw e}))})).then((function(t){n.value="",a.value="",o.value="",e.context.addNote(t),e.props.history.push("/folders/".concat(n.value))})).catch((function(t){e.setState({apiError:t})}))}},e}return Object(d.a)(r,[{key:"render",value:function(){var e=this.state.errors,t=this.context.folders;return this.state.apiError?Object(m.jsx)("p",{className:"error",children:this.state.apiError}):Object(m.jsxs)("form",{onSubmit:this.handleSubmit,children:[Object(m.jsxs)("fieldset",{children:[Object(m.jsx)("legend",{children:"New Note"}),Object(m.jsx)("label",{htmlFor:"id_folder",children:"Folder"}),Object(m.jsxs)("select",{id:"id_folder",name:"id_folder","aria-label":"Folder Id",required:!0,"aria-required":"true","aria-describedby":"id_folderError","aria-invalid":"true",value:this.state.id_folder,onChange:this.handleChange,children:[Object(m.jsx)("option",{value:"",children:"Select a folder"}),t.map((function(e){return Object(m.jsx)("option",{value:e.id,children:e.name},e.id)}))]}),e.id_folder.length>0&&Object(m.jsx)(_,{id:"id_folderError",message:e.id_folder}),Object(m.jsx)("label",{htmlFor:"name",children:"Title"}),Object(m.jsx)("input",{type:"text",id:"name",name:"name",onChange:this.handleChange,"aria-label":"Note Title",required:!0,"aria-required":"true","aria-describedby":"noteTitleError","aria-invalid":"true"}),e.name.length>0&&Object(m.jsx)(_,{id:"noteTitleError",message:e.name}),Object(m.jsx)("label",{htmlFor:"content",children:"Description"}),Object(m.jsx)("textarea",{id:"content",name:"content",onChange:this.handleChange,"aria-label":"Note Description",required:!0,"aria-required":"true","aria-describedby":"noteDescriptionError","aria-invalid":"true"}),e.content.length>0&&Object(m.jsx)(_,{id:"noteDescriptionError",message:e.content}),Object(m.jsx)("br",{}),Object(m.jsx)("button",{className:"btn-cancel",onClick:this.handleClickCancel,children:"Cancel"})," ",Object(m.jsx)("button",{className:"btn-save",disabled:!1===this.state.formValid,children:"Save Note"})]}),null!==this.state.errorCount?Object(m.jsxs)("p",{className:"form-status",children:["Form is ",this.state.formValid?"complete  \u2705":"incomplete  \u274c"]}):null]})}}]),r}(a.a.Component);T.contextType=p;var I=T,A=function(e){Object(h.a)(r,e);var t=Object(u.a)(r);function r(){var e;Object(l.a)(this,r);for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).state={apiError:null,formValid:!0,errorCount:null,id:e.props.match.params.id_folder,name:"",errors:{name:""}},e.updateErrorCount=function(){var t=e.state.errors,r=0;Object.values(t).forEach((function(e){e.length>0&&r++})),e.setState({errorCount:r});var n=0===r;e.setState({formValid:n})},e.validateField=function(t,r){var n="";"name"===t&&(0===r.trim().length?n="Folder name is required":r.trim().length<3&&(n="Folder name must be at least 3 characters long"));var a=Object(N.a)({},e.state).errors;a[t]=n,e.setState({errors:a})},e.handleChange=function(t){var r=t.target,n=r.name,a=r.value;e.setState(Object(y.a)({},n,a.trim())),e.validateField(n,a),e.updateErrorCount()},e.handleClickCancel=function(){e.props.history.push("/")},e.resetFields=function(t){e.setState({id:t.id||"",name:t.name||""})},e.handleSubmit=function(t){if(t.preventDefault(),!(e.state.errorCount>0)){var r=e.props.match.params.id_folder,n=e.state,a={id:n.id,name:n.name};e.setState({apiError:null}),fetch(f.FOLDERS_ENDPOINT+"/".concat(r),{method:"PATCH",body:JSON.stringify(a),headers:{"content-type":"application/json",authorization:"Bearer ".concat(f.API_KEY)}}).then((function(e){if(!e.ok)return e.json().then((function(e){return Promise.reject(e)}))})).then((function(){e.resetFields(a),e.context.updateFolders(a),e.props.history.push("/")})).catch((function(t){e.setState({apiError:t})}))}},e}return Object(d.a)(r,[{key:"componentDidMount",value:function(){var e=this,t=this.props.match.params.id_folder;fetch(f.FOLDERS_ENDPOINT+"/".concat(t),{method:"GET",headers:{"content-type":"application/json",authorization:"Bearer ".concat(f.API_KEY)}}).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).then((function(t){e.setState({id:t.id,name:t.name})})).catch((function(t){e.setState({apiError:t})}))}},{key:"render",value:function(){var e=this,t=this.state.errors;return this.state.apiError?Object(m.jsx)("p",{className:"error",children:this.state.apiError}):Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("form",{className:"editFolderForm",onSubmit:this.handleSubmit,noValidate:!0,children:Object(m.jsxs)("fieldset",{children:[Object(m.jsx)("legend",{children:"Edit Folder"}),Object(m.jsx)("label",{htmlFor:"name",children:"Name"}),Object(m.jsx)("input",{type:"text",id:"name",name:"name","aria-label":"Folder Name",required:!0,"aria-required":"true","aria-describedby":"folderNameError","aria-invalid":"true",value:this.state.name,onChange:this.handleChange}),t.name.length>0&&Object(m.jsx)(_,{message:t.name,id:"folderNameError"}),Object(m.jsx)("br",{}),Object(m.jsx)("button",{className:"btn-cancel",onClick:this.handleClickCancel,children:"Cancel"})," ",Object(m.jsx)("button",{className:"btn-save",disabled:!1===this.state.formValid,children:"Save Folder"})," "]})}),this.state.formValid?Object(m.jsx)("button",{className:"btn-delete-folder btn-position",disabled:!1===this.state.formValid,onClick:function(){return e.context.handleClickDeleteFolder(e.state.id,e.props)},children:"Delete"}):null,null!==this.state.errorCount?Object(m.jsxs)("p",{className:"form-status",children:["Form is ",this.state.formValid?"complete  \u2705":"incomplete  \u274c"]}):null]})}}]),r}(a.a.Component);A.contextType=p;var P=A,q=function(e){Object(h.a)(r,e);var t=Object(u.a)(r);function r(){var e;Object(l.a)(this,r);for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).state={apiError:null,formValid:!0,errorCount:null,id:"",id_folder:"",name:"",content:"",errors:{id_folder:"",name:"",content:""}},e.updateErrorCount=function(){var t=e.state.errors,r=0;Object.values(t).forEach((function(e){e.length>0&&r++})),e.setState({errorCount:r});var n=0===r;e.setState({formValid:n})},e.validateField=function(t,r){var n="";"name"===t&&(0===r.length?n="Note title is required":r.length<3&&(n="Note title must be at least 3 characters long")),"id_folder"===t&&0===r.length&&(n="You must select a folder"),"content"===t&&(0===r.length?n="You must enter a description":r.length<5&&(n="The description must be at least 5 characters long"));var a=Object(N.a)({},e.state).errors;a[t]=n,e.setState({errors:a})},e.handleChange=function(t){var r=t.target,n=r.name,a=r.value;e.setState(Object(y.a)({},n,a)),e.validateField(n,a),e.updateErrorCount()},e.handleClickCancel=function(){e.props.history.push("/")},e.resetFields=function(t){e.setState({id:t.id||"",name:t.name||"",content:t.content||"",id_folder:t.id_folder||""})},e.handleSubmit=function(t){if(t.preventDefault(),!(e.state.errorCount>0)){var r=e.props.match.params.noteId,n={id:"postgresql"===f.DATASOURCE?parseInt(e.state.id):e.state.id,id_folder:"postgresql"===f.DATASOURCE?parseInt(e.state.id_folder):e.state.id_folder,name:e.state.name,content:e.state.content,modified:new Date};e.setState({apiError:null}),fetch(f.NOTES_ENDPOINT+"/".concat(r),{method:"PATCH",body:JSON.stringify(n),headers:{"content-type":"application/json",authorization:"Bearer ".concat(f.API_KEY)}}).then((function(e){if(!e.ok)return e.json().then((function(e){return Promise.reject(e)}))})).then((function(){e.resetFields(n),e.context.updateNotes(n),e.props.history.push("/folders/".concat(e.state.id_folder))})).catch((function(t){t(t),e.setState({apiError:t})}))}},e}return Object(d.a)(r,[{key:"componentDidMount",value:function(){var e=this,t=this.props.match.params.noteId;fetch(f.NOTES_ENDPOINT+"/".concat(t),{method:"GET",headers:{"content-type":"application/json",authorization:"Bearer ".concat(f.API_KEY)}}).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).then((function(t){e.setState({id:t.id,name:t.name,id_folder:t.id_folder,content:t.content})})).catch((function(t){e.setState({apiError:t})}))}},{key:"render",value:function(){var e=this.state,t=e.errors,r=e.name,n=e.content,a=e.id_folder,o=this.context.folders;return this.state.apiError?Object(m.jsx)("p",{className:"error",children:this.state.apiError}):Object(m.jsxs)("form",{onSubmit:this.handleSubmit,children:[Object(m.jsxs)("fieldset",{children:[Object(m.jsx)("legend",{children:"Edit Note"}),Object(m.jsx)("label",{htmlFor:"id_folder",children:"Folder"}),Object(m.jsxs)("select",{id:"id_folder",name:"id_folder","aria-label":"Folder Id",required:!0,"aria-required":"true","aria-describedby":"id_folderError","aria-invalid":"true",value:a,onChange:this.handleChange,children:[Object(m.jsx)("option",{value:"",children:"Select a folder"}),o.map((function(e){return Object(m.jsx)("option",{value:e.id,children:e.name},e.id)}))]}),t.id_folder.length>0&&Object(m.jsx)(_,{id:"id_folderError",message:t.id_folder}),Object(m.jsx)("label",{htmlFor:"name",children:"Title"}),Object(m.jsx)("input",{type:"text",id:"name",name:"name",value:r,onChange:this.handleChange,"aria-label":"Note Title",required:!0,"aria-required":"true","aria-describedby":"noteTitleError","aria-invalid":"true"}),t.name.length>0&&Object(m.jsx)(_,{id:"noteTitleError",message:t.name}),Object(m.jsx)("label",{htmlFor:"content",children:"Description"}),Object(m.jsx)("textarea",{id:"content",name:"content",value:n,onChange:this.handleChange,"aria-label":"Note Description",required:!0,"aria-required":"true","aria-describedby":"noteDescriptionError","aria-invalid":"true"}),t.content.length>0&&Object(m.jsx)(_,{id:"noteDescriptionError",message:t.content}),Object(m.jsx)("br",{}),Object(m.jsx)("button",{className:"btn-cancel",onClick:this.handleClickCancel,children:"Cancel"})," ",Object(m.jsx)("button",{className:"btn-save",disabled:!1===this.state.formValid,children:"Save Note"})]}),null!==this.state.errorCount?Object(m.jsxs)("p",{className:"form-status",children:["Form is ",this.state.formValid?"complete  \u2705":"incomplete  \u274c"]}):null]})}}]),r}(a.a.Component);q.contextType=p;var w=[{path:"/",exact:!0,header:b,aside:v,section:F},{path:"/folders/:id_folder",exact:!0,header:b,aside:v,section:F},{path:"/notes/:noteId",exact:!0,header:b,aside:E,section:S},{path:"/add-folder",exact:!0,header:b,aside:null,section:D},{path:"/add-note",exact:!0,header:b,aside:null,section:I},{path:"/edit-note/:noteId",exact:!0,header:b,aside:null,section:q},{path:"/edit-folder/:id_folder",exact:!0,header:b,aside:null,section:P},{path:"/delete-folder/:id_folder",exact:!0,header:b,aside:v,section:F},{path:"/:any/:any/:any",exact:!0,header:b,aside:function(){return null},section:function(){return"Do not edit the  url!"}}],V=function(e){Object(h.a)(r,e);var t=Object(u.a)(r);function r(){var e;Object(l.a)(this,r);for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).state={folders:[],notes:[],foldersError:null,notesError:null,deleteFolderId:null},e.deleteNote=function(t){var r=e.state.notes.filter((function(e){return e.id!==t}));e.setState({notes:r})},e.deleteFolder=function(t){var r=e.state.folders.filter((function(e){return e.id!==t}));e.setState({folders:r}),e.getNotes()},e.addNote=function(t){e.setState({notes:[].concat(Object(c.a)(e.state.notes),[t])})},e.addFolder=function(t){e.setState({folders:[].concat(Object(c.a)(e.state.folders),[t])})},e.addErrorNotes=function(t){e.setState({notesError:t})},e.addErrorFolders=function(t){e.setState({foldersError:t})},e.setFolders=function(t){e.setState({folders:t,error:null})},e.setNotes=function(t){e.setState({notes:t,error:null})},e.getFolders=function(){fetch(f.FOLDERS_ENDPOINT,{method:"GET",headers:{"content-type":"application/json",Authorization:"Bearer ".concat(f.API_KEY)}}).then((function(e){if(!e.ok)throw new Error(e.status);return e.json()})).then(e.setFolders).catch((function(t){return e.setState({foldersError:t})}))},e.getNotes=function(){fetch(f.NOTES_ENDPOINT,{method:"GET",headers:{"content-type":"application/json",Authorization:"Bearer ".concat(f.API_KEY)}}).then((function(e){if(!e.ok)throw new Error(e.status);return e.json()})).then(e.setNotes).catch((function(t){return e.setState({notesError:t})}))},e.updateFolders=function(t){var r=e.state.folders.map((function(e){return e.id!==t.id?e:t}));e.setState({folders:r})},e.updateNotes=function(t){var r=e.state.notes.map((function(e){return e.id!==t.id?e:t}));e.setState({notes:r})},e.handleClickDeleteFolder=function(t,r){fetch(f.FOLDERS_ENDPOINT+"/".concat(t),{method:"DELETE",headers:{"content-type":"application/json",Authorization:"Bearer ".concat(f.API_KEY)}}).then((function(e){return e.ok&&"404"!==e.status?e.json():e.json().then((function(t){throw e.status}))})).then((function(n){e.deleteFolder(t),r.history.push("/")})).catch((function(n){404!==n&&e.addErrorFolders(n),404===n&&(e.deleteFolder(t),r.history.push("/"))}))},e}return Object(d.a)(r,[{key:"componentDidMount",value:function(){this.getFolders(),this.getNotes()}},{key:"render",value:function(){var e={notes:this.state.notes,folders:this.state.folders,deleteNote:this.deleteNote,addNote:this.addNote,addFolder:this.addFolder,addErrorNotes:this.addErrorNotes,addErrorFolders:this.addErrorFolders,notesError:this.notesError,updateFolders:this.updateFolders,updateNotes:this.updateNotes,handleClickDeleteFolder:this.handleClickDeleteFolder};return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(b,{}),Object(m.jsx)(p.Provider,{value:e,children:Object(m.jsxs)("main",{children:[Object(m.jsxs)("div",{className:"aside",children:[this.state.foldersError&&Object(m.jsx)("p",{className:"error",children:this.state.foldersError.value}),w.map((function(e){var t=e.path,r=e.exact,n=e.aside;return Object(m.jsx)(j.a,{path:t,exact:r,component:n},t)}))]}),Object(m.jsxs)("article",{children:[this.state.notesError&&Object(m.jsx)("p",{className:"error",children:this.state.notesError.value}),w.map((function(e){var t=e.path,r=e.exact,n=e.section;return Object(m.jsx)(j.a,{path:t,exact:r,component:n},t)}))]})]})}),Object(m.jsx)(O,{})]})}}]),r}(a.a.Component);s.a.render(Object(m.jsx)(i.a,{basename:"",children:Object(m.jsx)(V,{})}),document.getElementById("root"))}},[[37,1,2]]]);
//# sourceMappingURL=main.b2bf1e85.chunk.js.map