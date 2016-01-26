page.base('');

page('/', parkController.index);
page('/parks/:id', parkController.byParkName);
// page('/about')

page();
