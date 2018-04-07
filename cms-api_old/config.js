module.exports = function (app){

	require('./route/login')(app);
	require('./route/image-manager')(app);
	require('./route/profile')(app);
	require('./route/store-setting')(app);
	require('./route/social-media')(app);
	require('./route/address')(app);
	require('./route/figure')(app);
	require('./route/service')(app);
	require('./route/slider')(app);
	require('./route/testimony')(app);
	require('./route/about')(app);
	require('./route/enquiry')(app);
	require('./route/subscribe')(app);
	require('./route/category')(app);
	require('./route/product')(app);
}
