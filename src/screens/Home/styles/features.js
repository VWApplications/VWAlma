import React from 'react';
import styled from 'styled-components';

export const PageHeader = ({ children }) => (
    <div className="page-header" id="features">
        <h1 id="timeline" className="white">
            {children}
        </h1>
    </div>
)

export const Timeline = styled.ul`
    list-style: none;
    padding: 20px 0 20px;
    position: relative;

    :before {
        top: 0;
        bottom: 0;
        position: absolute;
        content: "";
        width: 3px;
        background-color: #eeeeee;
        left: 50%;
        margin-left: -1.5px;
    }

    @media (max-width: 767px) {
        :before {
            left: 40px;
        }
    }
`;

const TimelineItemStyled = styled.li`
    margin-bottom: 20px;
    position: relative;

    :before {
        content: "";
        display: table;
    }

    :after {
        content: "";
        display: table;
        clear: both;
    }
`;

const TimelinePanel = styled.div`
    width: 46%;
    float: left;
    border: 1px solid #d4d4d4;
    border-radius: 2px;
    padding: 20px;
    position: relative;
    background-color: white;
    -webkit-box-shadow: 0 1px 6px white;
    box-shadow: 0 1px 6px white;
    -webkit-transition-duration: 2s;
    -moz-transition-duration: 2s;
    transition-duration: 2s;
    z-index: 2;

    :hover {
        -webkit-transform: scale(1.1, 1.1);
        -moz-transform: scale(1.1, 1.1);
        transform: scale(1.1, 1.1);
        -webkit-transition-duration: 2s;
        -moz-transition-duration: 2s;
        transition-duration: 2s;
    }

    :after {
        position: absolute;
        top: 27px;
        right: -12px;
        display: inline-block;
        border-top: 14px solid transparent;
        border-left: 14px solid white;
        border-right: 0 solid white;
        border-bottom: 14px solid transparent;
        content: "";
    }

    ${props => props.inverted ? "float: right;" : ""}
    ${props => props.inverted ? 
        ":after {border-left-width: 0; border-right-width: 14px; left: -12px; right: auto;}"
    : ""}

    @media (max-width: 767px) {
        width: calc(100% - 90px);
        width: -moz-calc(100% - 90px);
        width: -webkit-calc(100% - 90px);
        float: right;

        :before {
            border-left-width: 0;
            border-right-width: 15px;
            left: -15px;
            right: auto;
        }

        :after {
            border-left-width: 0;
            border-right-width: 14px;
            left: -14px;
            right: auto;
        }
    }
`;

const TimelineBadge = styled.div`
    color: #fff;
    width: 50px;
    height: 50px;
    line-height: 50px;
    font-size: 1.4em;
    text-align: center;
    position: absolute;
    top: 16px;
    left: 50%;
    margin-left: -25px;
    background-color: #999999;
    z-index: 1;
    border-top-right-radius: 50%;
    border-top-left-radius: 50%;
    border-bottom-right-radius: 50%;
    border-bottom-left-radius: 50%;
    -webkit-box-shadow: 0 1px 6px white;
    box-shadow: 0 1px 6px white;

    ${props => props.className.includes("primary") ? "background-color: #2e6da4 !important;" : ""}
    ${props => props.className.includes("success") ? "background-color: #3f903f !important;" : ""}
    ${props => props.className.includes("warning") ? "background-color: #f0ad4e !important;" : ""}
    ${props => props.className.includes("danger") ? "background-color: #d9534f !important;" : ""}
    ${props => props.className.includes("info") ? "background-color: #5bc0de !important;" : ""}

    @media (max-width: 767px) {
        left: 15px;
        margin-left: 0;
        top: 16px;
    }
`;

const TimelineTitle = styled.h4`
    margin-top: 0;
    color: inherit;
`;

const TimelineBody = styled.p`
    margin-bottom: 0;
    text-align: justify;
`;

export const TimelineItem = ({ title, children, color, icon, inverted=false }) => (
    <TimelineItemStyled>
        <TimelineBadge className={color}>
            <i className={"fa " + icon}></i>
        </TimelineBadge>
        <TimelinePanel inverted={inverted}>
            <TimelineTitle>{title}</TimelineTitle>
            <hr />
            <TimelineBody>{children}</TimelineBody>
        </TimelinePanel>
    </TimelineItemStyled>
)
