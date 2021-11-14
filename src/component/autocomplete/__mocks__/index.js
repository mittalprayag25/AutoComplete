import { createElement } from 'react';

const AutoComplete = (p) => createElement('AutoComplete', p);

jest.setMock('..', AutoComplete);
