// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: "#3aa757" }, function () {
    console.log("The color is green.");
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "developer.chrome.com", schemes: ["https"] },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });

  chrome.contextMenus.create(
    {
      type: "normal",
      title: "搜尋「%s」",
      id: "myContextMenuItem",
      contexts: ["all"],
    },
    function () {
      console.log("contextMenus are create.");
    }
  );
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId == "myContextMenuItem") {
    chrome.tabs.create({
      url: "http://www.google.com/search?q=" + info.selectionText,
    });
  }
});
