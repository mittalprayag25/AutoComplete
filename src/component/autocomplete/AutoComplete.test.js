import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import AutoComplete from './AutoComplete';

test('Renders AutoComplete', () => {
    const props = {
        value: "America",
        options: ['India', 'Singapore', 'China', 'America', 'Australia', 'Kenya', 'South Afirca', 'Iraq', 'Canada'],
        onChange: jest.fn(),
        multiValues: ['India', 'Singapore', 'China'],
        onRemove: jest.fn(),
        onTextChange: jest.fn(),
    }
    const { asFragment } = render(<AutoComplete {...props} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Test onKeyUp in input', () => {
    const setDictionary = jest.fn();
    const props = {
        value: "America",
        options: ['India', 'Singapore', 'China', 'America', 'Australia', 'Kenya', 'South Afirca', 'Iraq', 'Canada'],
        onChange: jest.fn(),
        multiValues: ['India', 'Singapore', 'China'],
        onRemove: jest.fn(),
        onTextChange: jest.fn(),
    }
    const { getByTestId } = render(<AutoComplete {...props} />);
    act(() => {
        fireEvent.keyUp(getByTestId('searchInput'), { target: { value: 'america' } });
    });
    expect(props.onTextChange).toHaveBeenCalledTimes(1);

    expect(getByTestId('searchInput').value).toBe('america');

    act(() => {
        fireEvent.keyUp(getByTestId('searchInput'), { target: { value: '' } });
    });
    expect(props.onTextChange).toHaveBeenCalledTimes(2);
    expect(getByTestId('searchInput').value).toBe('');
});

test('Test options with no multi values', () => {
    const props = {
        value: "America",
        options: ['India', 'Singapore', 'China', 'America', 'Australia', 'Kenya', 'South Afirca', 'Iraq', 'Canada'],
        onChange: jest.fn(),
        multiValues: [],
        onRemove: jest.fn(),
        onTextChange: jest.fn(),
    }
    const { queryByTestId } = render(<AutoComplete {...props} />);

    expect(queryByTestId('selectedOptions')).toBeNull();

});

test('Test selectCOntainer when no options', () => {
    const updatedProps = {
        value: "America",
        options: [],
        onChange: jest.fn(),
        multiValues: [],
        onRemove: jest.fn(),
        onTextChange: jest.fn(),
    };

    const { queryByTestId, getByTestId } = render(<AutoComplete {...updatedProps} />);
    act(() => {
        fireEvent.keyUp(getByTestId('searchInput'), { target: { value: 'america' } });
    });

    expect(queryByTestId('selectContainer')).toBeNull();
});

test('Test Input with keyDOWN code 40', () => {
    const props = {
        value: "America",
        options: ['India', 'Singapore', 'China', 'America', 'Australia', 'Kenya', 'South Afirca', 'Iraq', 'Canada'],
        onChange: jest.fn(),
        multiValues: [],
        onRemove: jest.fn(),
        onTextChange: jest.fn(),
    }

    const { queryByTestId, getByTestId } = render(<AutoComplete {...props} />);
    act(() => {
        fireEvent.keyDown(getByTestId('searchInput'), { target: { value: 'america' }, key: "Enter", keyCode: 40 });
    });

    expect(queryByTestId('selectContainer')).not.toBeNull();
});

test('Test Input with keyDOWN with keydown code not 40', () => {
    const props = {
        value: "America",
        options: ['India', 'Singapore', 'China', 'America', 'Australia', 'Kenya', 'South Afirca', 'Iraq', 'Canada'],
        onChange: jest.fn(),
        multiValues: [],
        onRemove: jest.fn(),
        onTextChange: jest.fn(),
    }

    const { queryByTestId, getByTestId } = render(<AutoComplete {...props} />);
    act(() => {
        fireEvent.keyDown(getByTestId('searchInput'), { target: { value: 'america' }, key: "Enter", keyCode: 40 });
    });

    expect(queryByTestId('selectContainer')).not.toBeNull();
});

test('Test select Container', () => {
    const props = {
        value: "America",
        options: ['India', 'Singapore', 'China', 'America', 'Australia', 'Kenya', 'South Afirca', 'Iraq', 'Canada'],
        onChange: jest.fn(),
        multiValues: [],
        onRemove: jest.fn(),
        onTextChange: jest.fn(),
    }
    const { queryByTestId } = render(<AutoComplete {...props} />);

    expect(queryByTestId('selectContainer')).not.toBeNull();
});



test('Test select Container when input text is empty', () => {
    const props = {
        value: "",
        options: ['India', 'Singapore', 'China', 'America', 'Australia', 'Kenya', 'South Afirca', 'Iraq', 'Canada'],
        onChange: jest.fn(),
        multiValues: [],
        onRemove: jest.fn(),
        onTextChange: jest.fn(),
    }
    const { queryByTestId } = render(<AutoComplete {...props} />);

    expect(queryByTestId('selectContainer')).toBeNull();
});

test('Test select Container when option is clicked', () => {
    const props = {
        value: "America",
        options: ['India', 'Singapore', 'China', 'America', 'Australia', 'Kenya', 'South Afirca', 'Iraq', 'Canada'],
        onChange: jest.fn(),
        multiValues: [],
        onRemove: jest.fn(),
        onTextChange: jest.fn(),
    }
    const { getByTestId } = render(<AutoComplete {...props} />);
    act(() => {
        fireEvent.click(getByTestId('selectContainer'));
    });
    expect(props.onChange).toHaveBeenCalledTimes(1);

});


test('Test select Container when option is entered by pressing enter key', () => {
    const props = {
        value: "America",
        options: ['India', 'Singapore', 'China', 'America', 'Australia', 'Kenya', 'South Afirca', 'Iraq', 'Canada'],
        onChange: jest.fn(),
        multiValues: [],
        onRemove: jest.fn(),
        onTextChange: jest.fn(),
    }
    const { getByTestId } = render(<AutoComplete {...props} />);
    act(() => {
        fireEvent.keyUp(getByTestId('selectContainer'), { key: "Enter", keyCode: 13 });
    });
    expect(props.onChange).toHaveBeenCalledTimes(1);

});

test('Test Remove Function', () => {
    const props = {
        value: "America",
        options: ['India', 'Singapore', 'China', 'America', 'Australia', 'Kenya', 'South Afirca', 'Iraq', 'Canada'],
        onChange: jest.fn(),
        multiValues: ['India'],
        onRemove: jest.fn(),
        onTextChange: jest.fn(),
    }
    const { getByTestId } = render(<AutoComplete {...props} />);
    act(() => {
        fireEvent.click(getByTestId('removeItem'));
    });
    expect(props.onRemove).toHaveBeenCalledTimes(1);

});
