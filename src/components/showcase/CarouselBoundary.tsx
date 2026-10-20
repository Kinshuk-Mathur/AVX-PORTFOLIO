import { Component, type PropsWithChildren, type ReactNode } from 'react';

// A GPU/context failure must leave the ordinary media controls usable.
export class CarouselBoundary extends Component<PropsWithChildren<{ fallback: ReactNode }>, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}
