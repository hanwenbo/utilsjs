import React from 'react';
import { convertData,  convertDefaultData, getBgDefaultData, convertBorderData, convertShadowData,  getDomCssRule, } from './utils';


export const getDefaultValue = (dom, isMobile, state) => {
    let domStyle;
    if (state !== 'default') {
        domStyle = { ...getDomCssRule({ dom, isMobile, state }) };
    } else {
        domStyle = getDomCssRule({ dom, isMobile });
    }

    return domStyle;
}

export const getDefaultStyleObj = (dom, isMobile, state = 'default') => {
    // 当前带样式的 value;
    const domStyle = getDefaultValue(dom, isMobile, state);
    return getDefaultData(domStyle);
}

export const getDefaultData = (style) => {
    if (!style) {
        return null;
    }
    const borderBool = style.borderStyle !== 'none' && style.borderColor !== '0px'
        || style.borderTopStyle !== 'none' && style.borderTopColor !== '0px'
        || style.borderRightStyle !== 'none' && style.borderRightColor !== '0px'
        || style.borderBottomStyle !== 'none' && style.borderBottomColor !== '0px'
        || style.borderLeftStyle !== 'none' && style.borderLeftColor !== '0px';
    let result = {
        state: {
            cursor: style.cursor || 'auto',
        },
        layout: {
            display: style.display,
            // 只支持 row 布局
            alignItems: style.alignItems || 'stretch',
            justifyContent: style.justifyContent || 'flex-start',
        },
        font: {
            family: style.fontFamily,
            size: style.fontSize,
            weight: convertData(style.fontWeight) || 'normal',
            lineHeight: convertData(style.lineHeight),
            color: convertDefaultData(style.color),
            letterSpacing: convertData(style.letterSpacing),
            align: convertDefaultData(style.textAlign) || 'left',
            decoration: convertData(style.textDecoration || style.textDecorationLine) || 'none',
        },
        interface: {
            overflow: convertDefaultData(style.overflow) || 'visible',
            width: convertData(style.width),
            maxWidth: convertData(style.maxWidth),
            minWidth: convertData(style.minWidth),
            height: convertData(style.height),
            maxHeight: convertData(style.maxHeight),
            minHeight: convertData(style.minHeight),
            position: convertDefaultData(style.position) || 'static',
            top: convertDefaultData(convertData(style.top, true)),
            right: convertDefaultData(convertData(style.right, true)),
            bottom: convertDefaultData(convertData(style.bottom, true)),
            left: convertDefaultData(convertData(style.left, true)),
            zIndex: style.index || 0,
            float: style.float || 'none',
            clear: style.clear || 'none',
            opacity: parseFloat(style.opacity) === 0 || parseFloat(style.opacity) ? parseFloat(style.opacity) : 1,
        },
        background: {
            color: convertDefaultData(style.backgroundColor),
            image: getBgDefaultData(style),
        },
        border: {
            style: convertBorderData(style.borderStyle || (
                style.borderTopStyle ||
                style.borderRightStyle ||
                style.borderBottomStyle ||
                style.borderLeftStyle ?
                    {
                        top: style.borderTopStyle,
                        right: style.borderRightStyle,
                        bottom: style.borderBottomStyle,
                        left: style.borderLeftStyle,
                    } : null
            ), style.borderWidth) || 'none',
            color: borderBool && convertBorderData(style.borderColor || (
                style.borderTopColor ||
                style.borderRightColor ||
                style.borderBottomColor ||
                style.borderLeftColor ?
                    {
                        top: style.borderTopColor,
                        right: style.borderRightColor,
                        bottom: style.borderBottomColor,
                        left: style.borderLeftColor,
                    } : null
            ), style.borderWidth) || null,
            width: convertBorderData(style.borderWidth || (
                style.borderTopWidth ||
                style.borderRightWidth ||
                style.borderBottomWidth ||
                style.borderLeftWidth ?
                    {
                        top: style.borderTopWidth,
                        right: style.borderRightWidth,
                        bottom: style.borderBottomWidth,
                        left: style.borderLeftWidth,
                    } : null
            )),
            radius: convertBorderData(style.borderRadius || (
                style.borderTopLeftRadius ||
                style.borderTopRightRadius ||
                style.borderBottomRightRadius ||
                style.borderBottomLeftRadius ?
                    {
                        'top-left': style.borderTopLeftRadius,
                        'top-right': style.borderTopRightRadius,
                        'bottom-right': style.borderBottomRightRadius,
                        'bottom-left': style.borderBottomLeftRadius,
                    } : null
            ), null, true),
        },
        margin: {
            margin: convertBorderData(style.margin || {
                top: style.marginTop,
                right: style.marginRight,
                bottom: style.marginBottom,
                left: style.marginLeft,
            }),
            padding: convertBorderData(style.padding || {
                top: style.paddingTop,
                right: style.paddingRight,
                bottom: style.paddingBottom,
                left: style.paddingLeft,
            }),
        },
        shadow: {
            boxShadow: convertShadowData(style.boxShadow),
            textShadow: convertShadowData(style.textShadow),
        },
        transition: style.transition,
    };
    return result
};



