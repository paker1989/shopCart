import React, { forwardRef } from 'react';
import hoistStatics from 'hoist-non-react-statics'

export default function ConnectAvanced (
  selectFactory,
  {
    methodName = 'ConnectedAvanced',
    
    forwardRef = false,

    getDisplayName = name => `ConnectAdvanced ${name}`,

    context,

    ...connectOptions
  }
) {
  return function wrapWithConnected(toWrapComponent) {
    const wrappedComponentName =
    toWrapComponent.displayName || toWrapComponent.name || 'Component';

    const displayName = getDisplayName(wrappedComponentName);

    function makeDerivedPropsSelector() {
      let lastProps
      let lastState
      let lastDerivedProps
      let lastStore
      let sourceSelector

      return function selectDerivedProps(state, props, store) {
        if (pure && lastProps === props && lastState === state) {
          return lastDerivedProps
        }

        if (store !== lastStore) {
          lastStore = store
          sourceSelector = selectorFactory(
            store.dispatch,
            selectorFactoryOptions
          )
        }

        lastProps = props
        lastState = state

        const nextProps = sourceSelector(state, props)

        if (lastDerivedProps === nextProps) {
          return lastDerivedProps
        }

        lastDerivedProps = nextProps
        return lastDerivedProps
      }
    }

    function makeChildElementSelector() {
      let lastChildProps, lastForwardRef, lastChildElement

      return function selectChildElement(childProps, forwardRef) {
        if (childProps !== lastChildProps || forwardRef !== lastForwardRef) {
          lastChildProps = childProps
          lastForwardRef = forwardRef
          lastChildElement = (
            <FinalWrappedComponent {...childProps} ref={forwardRef} />
          )
        }

        return lastChildElement
      }
    }

    class Connect extends React.Component {
      constructor(props) {
        super(props);
        this.selectChildElement = makeChildElementSelector();
        this.selectDerivedProps = makeDerivedPropsSelector();
      }

      renderWrappedComponent = (value) => {
        const { store, storeState } = value;
        
        let wrappedProp;
        let forwardRef;

        if (forwardRef) {
          wrappedProp = this.props.wrappedProp;
          forwardRef = this.props.forwardRef;
        } 

        let derivedProps = this.selectDerivedProps(
          storeState,
          wrappedProp,
          store
        )

        return this.selectChildElement(derivedProps, forwardRef);
      }

      render() {
        return (
          <context.Consumer>
            {this.renderWrappedComponent}
          </context.Consumer>
        );
      }
    }

    let forwarded;
    if (forwardRef) {
      forwarded = React.forwardRef((props, ref) => {
        return <Connect wrappedProp={props} forwardedRef={ref} />
      })
      forwarded.displayName = displayName;
      forwarded.wrappedComponent = toWrapComponent;

      return hoistStatics(forwarded, toWrapComponent);
    }

    return hoistStatics(Connect, toWrapComponent);
  }
}