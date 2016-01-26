page.base('');

// page('/', parkController.index);
page('/', indexController.index);
// page('/parks/:id', parkController.byParkName);
page('/parks/:id', parkController.loadParkPage);
// page('/about')

page();
