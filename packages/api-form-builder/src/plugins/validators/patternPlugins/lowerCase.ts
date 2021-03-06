import { FbFormFieldPatternValidatorPlugin } from "@webiny/api-form-builder/types";

export default {
    type: "fb-form-field-validator-pattern",
    name: "form-field-validator-pattern-lower-case",
    pattern: {
        name: "lowerCase",
        regex: `^([a-z]*)$`,
        flags: ""
    }
} as FbFormFieldPatternValidatorPlugin;
