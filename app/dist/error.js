"use client";
"use strict";
exports.__esModule = true;
var Button_1 = require("./_components/Button");
function Error(_a) {
    var error = _a.error, reset = _a.reset;
    return (React.createElement("main", { className: "flex justify-center items-center flex-col gap-6" },
        React.createElement("h1", { className: "text-[3rem] font-semibold" }, "Something went wrong!"),
        React.createElement("p", { className: "text-[1.8rem]" }, "Please try again later."),
        React.createElement(Button_1["default"], { handleClick: reset, type: "primary" },
            " ",
            "Try again!")));
}
exports["default"] = Error;
