var Closeio = require("../lib/close.io.js");
var config = require("../config.json");
var assert = require("chai").assert;
var async = require("async");

function randomString() {
	return Math.floor(Math.random() * 10000).toString();
}

describe("Close.io API", function () {

	it("should create, read, updated, delete and search for leads.", function (done) {
		this.timeout(10000);

		var closeio = new Closeio(config.apiKey);

		async.waterfall([
			function (callback) {
				closeio.lead.create({
					name: "Test User"
				}, function (err, data) {
					if (err) {
						return callback(err);
					}
					callback(null, data);
				});
			},
			function (data, callback) {
				closeio.lead.read(data.id, function (err, data) {
					if (err) {
						return callback(err);
					}
					callback(null, data);
				});
			},
			function (data, callback) {
				closeio.lead.update(data.id, {
					name: "Test User 2"
				}, function (err, data) {
					if (err) {
						return callback(err);
					}
					assert.strictEqual(data.name, "Test User 2");
					callback(null, data);
				});
			},
			function (data, callback) {
				closeio.lead.delete(data.id, function (err, data) {
					if (err) {
						return callback(err);
					}
					callback(null, data);
				});
			},
			function (data, callback) {
				closeio.lead.search({
					name: "Test User 2"
				}, function (err, data) {
					if (err) {
						return callback(err);
					}
					assert.strictEqual(data.data.length, 0);
					callback(null);
				});
			}
		], function (err) {
			if (err) {
				done(err);
			}
			done();
		});
	});

	it("should create, read, update, delete lead statuses", function (done) {
		this.timeout(10000);

		var closeio = new Closeio(config.apiKey);
		var randomVal = randomString(); // for confirming update

		async.waterfall([
			function (callback) {
				closeio.status.lead.create({
					label: randomString()
				}, function (err, data) {
					if (err) {
						return callback(err);
					}
					callback(null, data);
				});
			},
			function (data, callback) {
				closeio.status.lead.read(data.id, function (err, data) {
					if (err) {
						return callback(err);
					}
					callback(null, data);
				});
			},
			function (data, callback) {
				closeio.status.lead.update(data.id, {
					label: randomVal
				}, function (err, data) {
					if (err) {
						return callback(err);
					}
					callback(null, data);
				});
			},
			function (data, callback) {
				assert.strictEqual(data.label, randomVal);
				closeio.status.lead.delete(data.id, function (err, data) {
					if (err) {
						return callback(err);
					}
					callback(null);
				});
			}
		], function (err) {
			if (err) {
				done(err);
			}
			done();
		});
	});

	it("should create, read, update, delete opportunity statuses", function (done) {
		this.timeout(10000);

		var closeio = new Closeio(config.apiKey);
		var randomVal = randomString(); // for confirming update

		async.waterfall([
			function (callback) {
				closeio.status.opportunity.create({
					label: randomString()
				}, function (err, data) {
					if (err) {
						return callback(err);
					}
					callback(null, data);
				});
			},
			function (data, callback) {
				closeio.status.opportunity.read(data.id, function (err, data) {
					if (err) {
						return callback(err);
					}
					callback(null, data);
				});
			},
			function (data, callback) {
				closeio.status.opportunity.update(data.id, {
					label: randomVal
				}, function (err, data) {
					if (err) {
						return callback(err);
					}
					callback(null, data);
				});
			},
			function (data, callback) {
				assert.strictEqual(data.label, randomVal);
				closeio.status.opportunity.delete(data.id, function (err, data) {
					if (err) {
						return callback(err);
					}
					callback(null);
				});
			}
		], function (err) {
			if (err) {
				done(err);
			}
			done();
		});
	});

	it("should create and search for leads with custom field containing spaces.", function (done) {
		this.timeout(10000);

		var closeio = new Closeio(config.apiKey);
		var lead_id;

		async.waterfall([
			function (callback) {
				closeio.lead.create({
					name: "Spaces Test User",
					custom: {
						"Lead initials": "STU"
					}
				}, function (err, data) {
					if (err) {
						return callback(err);
					}
					callback(null, data);
				});
			},
			function (data, callback) {
				lead_id = data.id;
				closeio.lead.search({
					"custom.Lead initials": "STU"
				}, function (err, data) {
					if (err) {
						return callback(err);
					}
					callback(null, data);
				});
			},
			function (data, callback) {
				assert(data.data.length > 0, "data is returned");
				closeio.lead.delete(lead_id, function (err, data) {
					if (err) {
						callback(err);
					}
					callback(null, data);
				});
			}
		], function (err) {
			if (err) {
				closeio.lead.delete(lead_id, function (err, data) {});
				done(err);
			}
			done();
		});
	});

	it("should create and search for all leads if no option is passed", function (done) {
		this.timeout(10000);

		var closeio = new Closeio(config.apiKey);
		var lead_id;

		async.waterfall([
			function (callback) {
				closeio.lead.create({
					name: "Test User"
				}, function (err, data) {
					if (err) {
						return callback(err);
					}
					callback(null, data);
				});
			},
			function (data, callback) {
				lead_id = data.id;
				closeio.lead.search({}, function (err, data) {
					if (err) {
						return callback(err);
					}
					assert(data.data.length > 0, "data is returned");
					callback(null, data);
				});
			},
			function (data, callback) {
				closeio.lead.delete(lead_id, function (err, data) {
					if (err) {
						return callback(err);
					}
					callback(null, data);
				});
			}
		], function (err) {
			if (err) {
				closeio.lead.delete(lead_id, function (err, data) {});
				done(err);
			}
			done();
		});
	});
});
