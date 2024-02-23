"use strict";(self.webpackChunkproduction_project=self.webpackChunkproduction_project||[]).push([[592],{"./src/entities/Article/model/services/fetchArticleById.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{G:function(){return fetchArticleById}});const fetchArticleById=(0,__webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js").aw)("article/fetchArticleById",(async(id,_ref)=>{let{rejectWithValue:rejectWithValue,extra:extra}=_ref;try{const response=await extra.api.get(`/articles/${id}`,{params:{_expand:"user"}});if(!response.data)throw new Error;return response.data}catch(error){return console.log(error),rejectWithValue("error")}}))},"./src/entities/Article/model/slice/articleDetailsSlice.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{u6:function(){return articleDetailsReducer}});var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js"),_services_fetchArticleById__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/entities/Article/model/services/fetchArticleById.ts");const initialState={isLoading:!1,error:void 0,data:void 0},articleDetailsSlice=(0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.is)({name:"articleDetails",initialState:initialState,reducers:{},extraReducers:builder=>{builder.addCase(_services_fetchArticleById__WEBPACK_IMPORTED_MODULE_0__.G.pending,(state=>{state.error=void 0,state.isLoading=!0})).addCase(_services_fetchArticleById__WEBPACK_IMPORTED_MODULE_0__.G.fulfilled,((state,action)=>{state.isLoading=!1,state.data=action.payload})).addCase(_services_fetchArticleById__WEBPACK_IMPORTED_MODULE_0__.G.rejected,((state,action)=>{state.isLoading=!1,state.error=action.payload}))}}),{actions:articleDetailsActions}=articleDetailsSlice,{reducer:articleDetailsReducer}=articleDetailsSlice},"./src/entities/User/index.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Go:function(){return getUserAuthData},C6:function(){return isUserAdmin},_5:function(){return isUserManager},By:function(){return userActions},If:function(){return userReducer}});var redux_toolkit_esm=__webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js"),localstorage=__webpack_require__("./src/shared/const/localstorage.ts");const userSlice=(0,redux_toolkit_esm.is)({name:"user",initialState:{_inited:!1},reducers:{setAuthData:(state,action)=>{state.authData=action.payload},initAuthData:state=>{const user=localStorage.getItem(localstorage.a2);user&&(state.authData=JSON.parse(user)),state._inited=!0},logout:state=>{state.authData=void 0,localStorage.removeItem(localstorage.a2)}}}),{actions:userActions}=userSlice,{reducer:userReducer}=userSlice;let UserRole=function(UserRole){return UserRole.ADMIN="ADMIN",UserRole.USER="USER",UserRole.MANAGER="MANAGER",UserRole}({});const getUserAuthData=state=>state.user.authData;var es=__webpack_require__("./node_modules/reselect/es/index.js");const getUserRoles=state=>state.user.authData?.roles,isUserAdmin=(0,es.M3)(getUserRoles,(roles=>Boolean(roles?.includes(UserRole.ADMIN)))),isUserManager=(0,es.M3)(getUserRoles,(roles=>Boolean(roles?.includes(UserRole.MANAGER))));try{getUserRoles.displayName="getUserRoles",getUserRoles.__docgenInfo={description:"",displayName:"getUserRoles",props:{counter:{defaultValue:null,description:"",name:"counter",required:!0,type:{name:"CounterSchema"}},user:{defaultValue:null,description:"",name:"user",required:!0,type:{name:"UserSchema"}},ui:{defaultValue:null,description:"",name:"ui",required:!0,type:{name:"UISchema"}},loginForm:{defaultValue:null,description:"",name:"loginForm",required:!1,type:{name:"LoginSchema"}},profile:{defaultValue:null,description:"",name:"profile",required:!1,type:{name:"ProfileSchema"}},articleDetails:{defaultValue:null,description:"",name:"articleDetails",required:!1,type:{name:"ArticleDetailsSchema"}},addCommentForm:{defaultValue:null,description:"",name:"addCommentForm",required:!1,type:{name:"AddCommentFormSchema"}},articlesPage:{defaultValue:null,description:"",name:"articlesPage",required:!1,type:{name:"ArticlePageSchema"}},articlesDetailsPage:{defaultValue:null,description:"",name:"articlesDetailsPage",required:!1,type:{name:"ArticleDetailsPageSchema"}},api:{defaultValue:null,description:"",name:"api",required:!0,type:{name:'CombinedState<{}, never, "api">'}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/entities/User/model/selectors/roleSelectors.tsx#getUserRoles"]={docgenInfo:getUserRoles.__docgenInfo,name:"getUserRoles",path:"src/entities/User/model/selectors/roleSelectors.tsx#getUserRoles"})}catch(__react_docgen_typescript_loader_error){}},"./src/features/AuthByUsername/model/services/loginByUsername/loginByUsername.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{a:function(){return loginByUsername}});var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js"),_entities_User__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/entities/User/index.ts"),_shared_const_localstorage__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/const/localstorage.ts");const loginByUsername=(0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.aw)("login/loginByUsername",(async(authData,_ref)=>{let{dispatch:dispatch,rejectWithValue:rejectWithValue,extra:extra}=_ref;try{const response=await extra.api.post("/login",authData);if(!response.data)throw new Error;return localStorage.setItem(_shared_const_localstorage__WEBPACK_IMPORTED_MODULE_2__.a2,JSON.stringify(response.data)),dispatch(_entities_User__WEBPACK_IMPORTED_MODULE_0__.By.setAuthData(response.data)),response.data}catch(error){return console.log(error),rejectWithValue("error")}}))},"./src/features/AuthByUsername/model/slice/loginSlice.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Si:function(){return loginActions},y8:function(){return loginReducer}});var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js"),_services_loginByUsername_loginByUsername__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/features/AuthByUsername/model/services/loginByUsername/loginByUsername.ts");const loginSlice=(0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.is)({name:"login",initialState:{isLoading:!1,username:"",password:""},reducers:{setUsername:(state,action)=>{state.username=action.payload},setPassword:(state,action)=>{state.password=action.payload}},extraReducers:builder=>{builder.addCase(_services_loginByUsername_loginByUsername__WEBPACK_IMPORTED_MODULE_0__.a.pending,(state=>{state.error=void 0,state.isLoading=!0})).addCase(_services_loginByUsername_loginByUsername__WEBPACK_IMPORTED_MODULE_0__.a.fulfilled,((state,action)=>{state.isLoading=!1})).addCase(_services_loginByUsername_loginByUsername__WEBPACK_IMPORTED_MODULE_0__.a.rejected,((state,action)=>{state.isLoading=!1,state.error=action.payload}))}}),{actions:loginActions}=loginSlice,{reducer:loginReducer}=loginSlice},"./src/features/UI/index.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{ot:function(){return getUIScrollByPath},_i:function(){return uiActions},S5:function(){return uiReducer}});const uiSlice=(0,__webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js").is)({name:"ui",initialState:{scroll:{}},reducers:{setScrollPosition:(state,_ref)=>{let{payload:payload}=_ref;state.scroll[payload.path]=payload.position}}}),{actions:uiActions}=uiSlice,{reducer:uiReducer}=uiSlice;const getUIScrollByPath=(0,__webpack_require__("./node_modules/reselect/es/index.js").M3)((state=>state.ui.scroll),((state,path)=>path),((scroll,path)=>scroll[path]||0))},"./src/features/editableProfileCard/model/constants/profileConstants.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{K:function(){return ValidateProfileError}});let ValidateProfileError=function(ValidateProfileError){return ValidateProfileError.INCORRECT_USER_DATA="INCORRECT_USER_DATA",ValidateProfileError.INCORRECT_AGE="INCORRECT_AGE",ValidateProfileError.INCORRECT_COUNTRY="INCORRECT_COUNTRY",ValidateProfileError.NO_DATA="NO_DATA",ValidateProfileError.SERVER_ERROR="SERVER_ERROR",ValidateProfileError}({})},"./src/features/editableProfileCard/model/selectors/getProfileState.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Ej:function(){return getProfileForm},Ir:function(){return getProfileReadOnly},c5:function(){return getProfileData},ek:function(){return getProfileValidateErrors},ih:function(){return getProfileError},wn:function(){return getProfileIsLoading}});const getProfileData=state=>state?.profile?.data,getProfileForm=state=>state?.profile?.form,getProfileError=state=>state?.profile?.error,getProfileIsLoading=state=>state?.profile?.isLoading,getProfileReadOnly=state=>state?.profile?.readonly,getProfileValidateErrors=state=>state?.profile?.validateErrors},"./src/features/editableProfileCard/model/services/fetchProfileData/fetchProfileData.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{D:function(){return fetchProfileData}});const fetchProfileData=(0,__webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js").aw)("profile/fetchProfileData",(async(profileId,_ref)=>{let{rejectWithValue:rejectWithValue,extra:extra}=_ref;try{const response=await extra.api.get(`/profile/${profileId}`);if(!response.data)throw new Error;return response.data}catch(error){return console.log(error),rejectWithValue("error")}}))},"./src/features/editableProfileCard/model/services/updateProfileData/updateProfileData.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{U:function(){return updateProfileData}});var redux_toolkit_esm=__webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js"),profileConstants=__webpack_require__("./src/features/editableProfileCard/model/constants/profileConstants.ts");var getProfileState=__webpack_require__("./src/features/editableProfileCard/model/selectors/getProfileState.ts");const updateProfileData=(0,redux_toolkit_esm.aw)("profile/updateProfileData",(async(_,_ref)=>{let{rejectWithValue:rejectWithValue,extra:extra,getState:getState}=_ref;const formData=(0,getProfileState.Ej)(getState()),errors=(profile=>{if(!profile)return[profileConstants.K.NO_DATA];const{first:first,lastname:lastname,age:age,country:country}=profile,errors=[];return first&&lastname||errors.push(profileConstants.K.INCORRECT_USER_DATA),age&&Number.isInteger(age)||errors.push(profileConstants.K.INCORRECT_AGE),country||errors.push(profileConstants.K.INCORRECT_COUNTRY),errors})(formData);if(errors.length)return rejectWithValue(errors);try{const response=await extra.api.put(`/profile/${formData?.id}`,formData);if(!response.data)throw new Error;return response.data}catch(error){return console.log(error),rejectWithValue([profileConstants.K.SERVER_ERROR])}}))},"./src/features/editableProfileCard/model/slice/profileSlice.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{SW:function(){return profileReducer},gV:function(){return profileActions}});var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js"),_features_editableProfileCard_model_services_fetchProfileData_fetchProfileData__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/features/editableProfileCard/model/services/fetchProfileData/fetchProfileData.ts"),_features_editableProfileCard_model_services_updateProfileData_updateProfileData__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/features/editableProfileCard/model/services/updateProfileData/updateProfileData.ts");const initialState={readonly:!0,isLoading:!1,error:void 0,data:void 0},profileSlice=(0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.is)({name:"profile",initialState:initialState,reducers:{setReadOnly:(state,action)=>{state.readonly=action.payload},updateProfile:(state,action)=>{state.form={...state.form,...action.payload}},cancelEdit:state=>{state.readonly=!0,state.validateErrors=void 0,state.form=state.data}},extraReducers:builder=>{builder.addCase(_features_editableProfileCard_model_services_fetchProfileData_fetchProfileData__WEBPACK_IMPORTED_MODULE_0__.D.pending,(state=>{state.error=void 0,state.isLoading=!0})).addCase(_features_editableProfileCard_model_services_fetchProfileData_fetchProfileData__WEBPACK_IMPORTED_MODULE_0__.D.fulfilled,((state,action)=>{state.isLoading=!1,state.data=action.payload,state.form=action.payload})).addCase(_features_editableProfileCard_model_services_fetchProfileData_fetchProfileData__WEBPACK_IMPORTED_MODULE_0__.D.rejected,((state,action)=>{state.isLoading=!1,state.error=action.payload})).addCase(_features_editableProfileCard_model_services_updateProfileData_updateProfileData__WEBPACK_IMPORTED_MODULE_1__.U.pending,(state=>{state.validateErrors=void 0,state.isLoading=!0})).addCase(_features_editableProfileCard_model_services_updateProfileData_updateProfileData__WEBPACK_IMPORTED_MODULE_1__.U.fulfilled,((state,action)=>{state.isLoading=!1,state.data=action.payload,state.form=action.payload,state.readonly=!0,state.validateErrors=void 0})).addCase(_features_editableProfileCard_model_services_updateProfileData_updateProfileData__WEBPACK_IMPORTED_MODULE_1__.U.rejected,((state,action)=>{state.isLoading=!1,state.validateErrors=action.payload}))}}),{actions:profileActions}=profileSlice,{reducer:profileReducer}=profileSlice},"./src/shared/api/rtkApi.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{W:function(){return rtkApi}});var _reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@reduxjs/toolkit/dist/query/react/rtk-query-react.esm.js"),_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@reduxjs/toolkit/dist/query/rtk-query.esm.js"),_shared_const_localstorage__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/const/localstorage.ts");const rtkApi=(0,_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__.KS)({reducerPath:"api",baseQuery:(0,_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_1__._)({baseUrl:"http://test-api.ru",prepareHeaders:headers=>{const token=localStorage.getItem(_shared_const_localstorage__WEBPACK_IMPORTED_MODULE_2__.a2)||"";return token&&headers.set("Authorization",token),headers}}),endpoints:builder=>({})})},"./src/shared/config/storybook/StoreDecorator/StoreDecorator.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{y:function(){return StoreDecorator}});var redux_toolkit_esm=__webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js"),User=__webpack_require__("./src/entities/User/index.ts"),UI=__webpack_require__("./src/features/UI/index.ts"),axios=__webpack_require__("./node_modules/axios/lib/axios.js"),localstorage=__webpack_require__("./src/shared/const/localstorage.ts");const $api=axios.c.create({baseURL:"http://test-api.ru"});$api.interceptors.request.use((config=>(config.headers&&(config.headers.Authorization=localStorage.getItem(localstorage.a2)||""),config)));var rtkApi=__webpack_require__("./src/shared/api/rtkApi.ts"),redux=__webpack_require__("./node_modules/redux/es/redux.js"),react=__webpack_require__("./node_modules/react/index.js"),es=__webpack_require__("./node_modules/react-redux/es/index.js");const counterSlice=function buildSlice(options){const slice=(0,redux_toolkit_esm.is)(options);return{...slice,useActions:()=>{const dispatch=(0,es.OY)();return(0,react.useMemo)((()=>(0,redux.sF)(slice.actions,dispatch)),[dispatch])}}}({name:"counter",initialState:{value:0},reducers:{increment:state=>{state.value+=1},decrement:state=>{state.value-=1}}}),{actions:counterActions,reducer:counterReducer,useActions:useCounterActions}=counterSlice;__webpack_require__("./src/shared/ui/Button/Button.tsx");const[useCounterValue,getCounterValue]=function buildSelectors(selector){return[()=>(0,es.w1)(selector),selector]}((state=>state.counter.value));var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function createReduxStore(initialState,asyncReducers){const reducerManager=function createReducerManager(initialReducers){const reducers={...initialReducers};let combinedReducer=(0,redux.TL)(reducers),keysToRemove=[];return{getReducerMap:()=>reducers,reduce:(state,action)=>{if(keysToRemove.length>0){state={...state};for(const key of keysToRemove)delete state[key];keysToRemove=[]}return combinedReducer(state,action)},add:(key,reducer)=>{key&&!reducers[key]&&(reducers[key]=reducer,combinedReducer=(0,redux.TL)(reducers))},remove:key=>{key&&reducers[key]&&(delete reducers[key],keysToRemove.push(key),combinedReducer=(0,redux.TL)(reducers))}}}({...asyncReducers,counter:counterReducer,user:User.If,ui:UI.S5,[rtkApi.W.reducerPath]:rtkApi.W.reducer}),store=(0,redux_toolkit_esm.eS)({reducer:reducerManager.reduce,devTools:!0,preloadedState:initialState,middleware:getDefaultMiddleware=>getDefaultMiddleware({thunk:{extraArgument:{api:$api}}}).concat(rtkApi.W.middleware)});return store.reducerManager=reducerManager,store}const StoreProvider=_ref=>{let{children:children,initialState:initialState,asyncReducers:asyncReducers}=_ref;const store=createReduxStore(initialState,asyncReducers);return(0,jsx_runtime.jsx)(es.C_,{store:store,children:children})};StoreProvider.displayName="StoreProvider";try{StoreProvider.displayName="StoreProvider",StoreProvider.__docgenInfo={description:"",displayName:"StoreProvider",props:{initialState:{defaultValue:null,description:"",name:"initialState",required:!1,type:{name:"any"}},asyncReducers:{defaultValue:null,description:"",name:"asyncReducers",required:!1,type:{name:"any"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/app/providers/StoreProvider/ui/StoreProvider.tsx#StoreProvider"]={docgenInfo:StoreProvider.__docgenInfo,name:"StoreProvider",path:"src/app/providers/StoreProvider/ui/StoreProvider.tsx#StoreProvider"})}catch(__react_docgen_typescript_loader_error){}var profileSlice=__webpack_require__("./src/features/editableProfileCard/model/slice/profileSlice.ts"),loginSlice=__webpack_require__("./src/features/AuthByUsername/model/slice/loginSlice.ts");const addCommentFormSlice_initialState={text:"",error:void 0},addCommentFormSlice=(0,redux_toolkit_esm.is)({name:"addCommentForm",initialState:addCommentFormSlice_initialState,reducers:{setText:(state,action)=>{state.text=action.payload}}}),{actions:addCommentFormActions}=addCommentFormSlice,{reducer:addCommentFormReducer}=addCommentFormSlice;var articleDetailsSlice=__webpack_require__("./src/entities/Article/model/slice/articleDetailsSlice.ts");const fetchCommentsByArticleId=(0,redux_toolkit_esm.aw)("article/fetchCommentsByArticleId",(async(articleId,_ref)=>{let{rejectWithValue:rejectWithValue,extra:extra}=_ref;if(!articleId)return rejectWithValue("error");try{const response=await extra.api.get("/comments",{params:{articleId:articleId,_expand:"user"}});if(!response.data)throw new Error;return response.data}catch(error){return console.log(error),rejectWithValue("error")}})),commentsAdapter=(0,redux_toolkit_esm.cr)({selectId:comment=>comment.id}),articleDetailsCommentsSlice=(commentsAdapter.getSelectors((state=>state.articlesDetailsPage?.comments||commentsAdapter.getInitialState())),(0,redux_toolkit_esm.is)({name:"articleDetailsCommentsSlice",initialState:commentsAdapter.getInitialState({isLoading:!1,error:void 0,ids:[],entities:{}}),reducers:{},extraReducers:builder=>{builder.addCase(fetchCommentsByArticleId.pending,(state=>{state.error=void 0,state.isLoading=!0})).addCase(fetchCommentsByArticleId.fulfilled,((state,action)=>{state.isLoading=!1,commentsAdapter.setAll(state,action.payload)})).addCase(fetchCommentsByArticleId.rejected,((state,action)=>{state.isLoading=!1,state.error=action.payload}))}})),{actions:articleDetailsCommentsActions}=articleDetailsCommentsSlice,{reducer:articleDetailsCommentsReducer}=articleDetailsCommentsSlice,fetchArticleRecommendation=(0,redux_toolkit_esm.aw)("articlesDetailsPage/fetchArticleRecommendation",(async(args,_ref)=>{let{rejectWithValue:rejectWithValue,extra:extra}=_ref;try{const response=await extra.api.get("/articles",{params:{_limit:4,_expand:"user"}});if(!response.data)throw new Error;return response.data}catch(error){return console.log(error),rejectWithValue("error")}})),recommendationsAdapter=(0,redux_toolkit_esm.cr)({selectId:article=>article.id}),articleDetailsPageRecommendationsSlice=(recommendationsAdapter.getSelectors((state=>state.articlesDetailsPage?.recommendations||recommendationsAdapter.getInitialState())),(0,redux_toolkit_esm.is)({name:"articleDetailsPageRecommendationsSlice",initialState:recommendationsAdapter.getInitialState({isLoading:!1,error:void 0,ids:[],entities:{}}),reducers:{},extraReducers:builder=>{builder.addCase(fetchArticleRecommendation.pending,(state=>{state.error=void 0,state.isLoading=!0})).addCase(fetchArticleRecommendation.fulfilled,((state,action)=>{state.isLoading=!1,recommendationsAdapter.setAll(state,action.payload)})).addCase(fetchArticleRecommendation.rejected,((state,action)=>{state.isLoading=!1,state.error=action.payload}))}})),{actions:articleDetailsPageRecommendationsActions}=articleDetailsPageRecommendationsSlice,{reducer:articleDetailsPageRecommendationsReducer}=articleDetailsPageRecommendationsSlice,articleDetailsPageReducer=(0,redux.TL)({recommendations:articleDetailsPageRecommendationsReducer,comments:articleDetailsCommentsReducer}),defaultAsyncReducers={loginForm:loginSlice.y8,profile:profileSlice.SW,articleDetails:articleDetailsSlice.u6,addCommentForm:addCommentFormReducer,articlesDetailsPage:articleDetailsPageReducer},StoreDecorator=(store,asyncReducers)=>StoryComponent=>(0,jsx_runtime.jsx)(StoreProvider,{initialState:store,asyncReducers:{...defaultAsyncReducers,...asyncReducers},children:(0,jsx_runtime.jsx)(StoryComponent,{})})}}]);