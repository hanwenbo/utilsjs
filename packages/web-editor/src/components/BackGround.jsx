import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'antd/lib/collapse';
import BgColorsOutlined from "@ant-design/icons/BgColorsOutlined"
import Icon from './common/Icon';
import Color from './common/Color';

import Image from './common/BackGroundImage';

const Panel = Collapse.Panel;

class EditorBg extends Component {
    static propTypes = {
        className: PropTypes.string,
        header: PropTypes.string,
        onChange: PropTypes.func,
        value: PropTypes.object,
        locale: PropTypes.object,
        editorElem: PropTypes.any,
        imageSelect: PropTypes.bool,
        onImageSelectClick: PropTypes.func
    };


    static defaultProps = {
        className: 'editor-bg',
        value: {
            color: null,
            image: {
                url: [''],
                repeat: ['repeat'],
                position: ['center'],
                size: ['contain'],
                attachment: ['scroll'],
            }
        },
        onChange: () => {
        },
        onImageSelectClick: (img) => {
        },
        imageSelect: false,
    };

    constructor(props) {
        super(props);
        this.imageRef = React.createRef();
    }

    onChange = (key, v, isDrag) => {
        const value = {
            ...this.props.value,
            [key]: v,
        };
        this.props.onChange('background', value, isDrag);
    }

    render() {
        const { value, locale, onChange, editorElem, ...props } = this.props;
        return (<Panel {...props} header={props.header || locale.header} forceRender={true}>
            <Color
                onChange={(e, isDrag) => {
                    this.onChange('color', e, isDrag);
                }}
                title={<Icon adapter prompt={locale.color}>
                    <BgColorsOutlined />
                </Icon>}
                color={value.color}
            />
            <Image
                ref={this.imageRef}
                onChange={(e, isDrag) => {
                    this.onChange('image', e, isDrag);
                }}
                locale={locale}
                value={value.image}
                editorElem={editorElem}
                imageSelect={props.imageSelect}
                onImageSelectClick={props.onImageSelectClick}
            />
        </Panel>);
    }
}

EditorBg.componentName = 'EditorBackGround';

export default EditorBg;
