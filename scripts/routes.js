page.base('');

page('/', parkController.index);
page('/parks/:id', parkController.index, parkController.byParkName);
page('/events', volunteerController.index);

page();
