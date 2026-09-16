const { db, persist, generateId } = require("../lib/store");
const ArrayQuery = require("../lib/ArrayQuery");

const REPORT_FIELDS = [
  "handShape", "palmShape", "fingerShape", "thumbAnalysis",
  "lifeLine", "heartLine", "headLine", "fateLine", "sunLine", "marriageLine", "moneyLine", "healthLine",
  "mountJupiter", "mountSaturn", "mountApollo", "mountMercury", "mountVenus", "mountMoon",
  "career", "education", "love", "marriage", "business", "finance", "children", "travel",
  "personality", "strengths", "weaknesses",
  "luckyNumber", "luckyColor", "luckyDay", "futureTimeline", "overallSummary",
];

function attachMethods(report) {
  if (!report) return null;

  report.deleteOne = async function () {
    const idx = db.reports.findIndex((r) => r._id === this._id);
    if (idx !== -1) db.reports.splice(idx, 1);
    persist();
  };

  return report;
}

function matches(report, query) {
  return Object.entries(query).every(([key, value]) => report[key] === value);
}

const Report = {
  async create(data) {
    const report = {
      _id: generateId(),
      user: data.user,
      palmImageUrl: data.palmImageUrl,
      handSide: data.handSide || "unspecified",
      analysisScore: data.analysisScore || 0,
      status: data.status || "completed",
      createdAt: new Date().toISOString(),
    };
    for (const field of REPORT_FIELDS) report[field] = data[field] || "";

    db.reports.push(report);
    persist();
    return attachMethods({ ...report });
  },

  find(query = {}) {
    const results = db.reports.filter((r) => matches(r, query));
    return new ArrayQuery(results);
  },

  findOne(query) {
    const found = db.reports.find((r) => matches(r, query));
    return attachMethods(found ? { ...found } : null);
  },

  async countDocuments(query = {}) {
    return db.reports.filter((r) => matches(r, query)).length;
  },
};

module.exports = Report;
