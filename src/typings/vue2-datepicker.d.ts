declare namespace IDatePicker {
    export interface IShortcuts {
        text: string;
        start: Date;
        end: Date;
    }

    export interface ITimePickerOptions {
        start: string;
        step: string;
        end: string;
    }

    export interface ILang {
        days: Array<string>;
        months: Array<string>;
        pickers: Array<string>;
        placeholder: {
            date: string;
            dateRange: string;
        }
    }

    export interface IDatePickerConfig {
        type?: string;
        range?: boolean;
        format?: string;
        lang?: string | ILang;
        clearable?: boolean;
        confirm?: boolean;
        editable?: boolean;
        disabled?: boolean;
        placeholder?: string;
        width?: number|string;
        notBefore?: string|Date;
        notAfter?: string|Date;
        disabledDays?: Array<number|string>|((date: Date) => Array<Date>);
        shortcuts?: boolean|Array<IShortcuts>
        timePickerOptions?: Array<ITimePickerOptions>|(() => Array<ITimePickerOptions>);
        minuteStep?: number;
        firstDayOfWeek?: number;
        inputClass?: string;
        inputName?: string;
        confirmText?: string;
        rangeSeparator?: string;
    }
}

declare module 'vue2-datepicker' {
    import { Component } from 'vue/types/options';
    import IDatePickerConfig = IDatePicker.IDatePickerConfig;

    const Datepicker: Component<any, any, any, IDatePickerConfig>;
    export = Datepicker;
}
