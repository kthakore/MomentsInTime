import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Login from '../../src/application/Login.jsx';

describe("<Login />", function() {
    it("contains a div.login", function() {
        expect(shallow(<Login />).contains(<div className="login" />)).toBe(true);
    });

});
