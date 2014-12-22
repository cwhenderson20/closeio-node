var request = require("request");
var Closeio;

Closeio = function (apiKey) {
	var self = this;
	var closeio = self;
	self.apiKey = apiKey;
	self.lead = {
		search: function (options, cb) {
			var parameters = {};
			if (options.limit) {
				parameters._limit = options.limit;
				delete options.limit;
			}
			if (options.skip) {
				parameters._skip = options.skip;
				delete options.skip;
			}
			if (options.fields) {
				parameters._fields = options.fields;
				delete options.fields;
			}

			var optionKeys = Object.keys(options);
			if (optionKeys.length > 0) {
				parameters.query = "";
				optionKeys.forEach(function (option) {
					var optionWrapper = (!/^".*"$/.test(option) && / +/.test(option)) ? "\"" : "";
					parameters.query += optionWrapper + option + optionWrapper + ":" + options[option] + " ";
				});
			}

			closeio._get("/lead/", parameters, cb);
		},
		create: function (options, cb) {
			closeio._post("/lead/", options, cb);
		},
		read: function (id, cb) {
			closeio._get("/lead/" + id + "/", null, cb);
		},
		update: function (id, options, cb) {
			closeio._put("/lead/" + id + "/", options, cb);
		},
		delete: function (id, cb) {
			closeio._delete("/lead/" + id + "/", cb);
		}
	};
	self.contact = {
		list: function (cb) {
			closeio._get("/contact/", null, cb);
		},
		create: function (options, cb) {
			closeio._post("/contact/", options, cb);
		},
		read: function (id, cb) {
			closeio._get("/contact/" + id + "/", null, cb);
		},
		update: function (id, options, cb) {
			closeio._put("/contact/" + id + "/", options, cb);
		},
		delete: function (id, cb) {
			closeio._delete("/contact/" + id + "/", cb);
		}
	};
	self.activity = {
		search: function (options, cb) {
			closeio._get("/activity/", options, cb);
		},
		note: {
			search: function (options, cb) {
				closeio._get("/activity/note/", options, cb);
			},
			create: function (options, cb) {
				closeio._post("/activity/note/", options, cb);
			},
			update: function (id, options, cb) {
				closeio._put("/activity/note/" + id, options, cb);
			},
			delete: function (id, cb) {
				closeio._delete("/activity/note/" + id + "/", cb);
			}
		},
		email: {
			search: function (options, cb) {
				closeio._get("/activity/email/", options, cb);
			},
			create: function (options, cb) {
				closeio._post("/activity/email/", options, cb);
			},
			update: function (id, options, cb) {
				closeio._put("/activity/email/" + id, options, cb);
			},
			delete: function (id, cb) {
				closeio._delete("/activity/email/" + id + "/", cb);
			}
		},
		call: {
			search: function (options, cb) {
				closeio._get("/activity/call/", options, cb);
			},
			delete: function (id, cb) {
				closeio._delete("/activity/call/" + id + "/", cb);
			}
		}
	};
	self.opportunity = {
		search: function (options, cb) {
			closeio._get("/opportunity/", options, cb);
		},
		create: function (options, cb) {
			closeio._post("/opportunity/", options, cb);
		},
		read: function (id, cb) {
			closeio._get("/opportunity/" + id + "/", null, cb);
		},
		update: function (id, options, cb) {
			closeio._put("/opportunity/" + id + "/", options, cb);
		},
		delete: function (id, cb) {
			closeio._delete("/opportunity/" + id + "/", cb);
		}
	};
	self.task = {
		search: function (options, cb) {
			closeio._get("/task/", options, cb);
		},
		create: function (options, cb) {
			closeio._post("/task/", options, cb);
		},
		read: function (id, cb) {
			closeio._get("/task/" + id + "/", null, cb);
		},
		update: function (id, options, cb) {
			closeio._put("/task/" + id + "/", options, cb);
		},
		delete: function (id, cb) {
			closeio._delete("/task/" + id + "/", cb);
		}
	};
	self.user = {
		me: function (cb) {
			closeio._get("/me/", null, cb);
		},
		read: function (id, cb) {
			closeio._get("/user/" + id + "/", null, cb);
		}
	};
	self.organization = {
		read: function (id, cb) {
			closeio._get("/organization/" + id + "/", null, cb);
		},
		update: function (id, options, cb) {
			closeio._put("/organization/" + id + "/", options, cb);
		}
	};
	self.report = {
		read: function (id, options, cb) {
			closeio._get("/report/" + id + "/", options, cb);
		}
	};
	self.email_template = {
		search: function (cb) {
			closeio._get("/email_template/", null, cb);
		},
		create: function (options, cb) {
			closeio._post("/email_template/", options, cb);
		},
		read: function (id, cb) {
			closeio._get("/email_template/" + id + "/", null, cb);
		},
		update: function (id, options, cb) {
			closeio._put("/email_template/" + id + "/", options, cb);
		},
		delete: function (id, cb) {
			closeio._delete("/email_template/" + id + "/", cb);
		}
	};
	self.saved_search = {
		search: function (cb) {
			closeio._get("/saved_search/", null, cb);
		},
		create: function (options, cb) {
			closeio._post("/saved_search/", options, cb);
		},
		read: function (id, cb) {
			closeio._get("/saved_search/" + id + "/", null, cb);
		},
		update: function (id, options, cb) {
			closeio._put("/saved_search/" + id + "/", options, cb);
		},
		delete: function (id, cb) {
			closeio._delete("/saved_search/" + id + "/", cb);
		}
	};
	self.status = {
		lead: {
			list: function (cb) {
				closeio._get("/status/lead/", null, cb);
			},
			create: function (options, cb) {
				closeio._post("/status/lead/", options, cb);
			},
			read: function (id, cb) {
				closeio._get("/status/lead/" + id + "/", null, cb);
			},
			update: function (id, options, cb) {
				closeio._put("/status/lead/" + id + "/", options, cb);
			},
			delete: function (id, cb) {
				closeio._delete("/status/lead/" + id + "/", cb);
			}
		},
		opportunity: {
			list: function (cb) {
				closeio._get("/status/opportunity/", null, cb);
			},
			create: function (options, cb) {
				closeio._post("/status/opportunity/", options, cb);
			},
			read: function (id, cb) {
				closeio._get("/status/opportunity/" + id + "/", null, cb);
			},
			update: function (id, options, cb) {
				closeio._put("/status/opportunity/" + id + "/", options, cb);
			},
			delete: function (id, cb) {
				closeio._delete("/status/opportunity/" + id + "/", cb);
			}
		}
	};
};

Closeio.prototype._request = function (options, cb) {
	options.auth = {
		user: this.apiKey,
		pass: ""
	};
	options.jar = false;

	request(options, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			return cb(null, JSON.parse(body));
		}
		if (error) {
			return cb(error);
		}
		return cb(new Error("Status code " + response.statusCode + " received. Please modify your request."));
	});
};

Closeio.prototype._post = function (path, options, cb) {
	options = {
		uri: "https://app.close.io/api/v1" + path,
		body: JSON.stringify(options),
		headers: {
			"Content-type": "application/json"
		},
		method: "POST"
	};
	this._request(options, cb);
};

Closeio.prototype._get = function (path, parameters, cb) {
	var options = {
		uri: "https://app.close.io/api/v1" + path,
		method: "GET",
		qs: parameters
	};
	this._request(options, cb);
};

Closeio.prototype._put = function (path, options, cb) {
	options = {
		uri: "https://app.close.io/api/v1" + path,
		body: JSON.stringify(options),
		headers: {
			"Content-type": "application/json"
		},
		method: "PUT"
	};
	this._request(options, cb);
};

Closeio.prototype._delete = function (path, cb) {
	var options = {
		uri: "https://app.close.io/api/v1" + path,
		method: "DELETE"
	};
	this._request(options, cb);
};

module.exports = exports = Closeio;
