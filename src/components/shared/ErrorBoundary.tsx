// ============================================================================
// Error Boundary Component
// ============================================================================
// A React error boundary catches JavaScript errors in the component tree
// and shows a fallback UI instead of crashing the whole app.
//
// Usage:
//   <ErrorBoundary>
//     <MyComponent />
//   </ErrorBoundary>
//
// This is a Class Component because React error boundaries can only
// be implemented with class lifecycle methods (componentDidCatch).
// In React 19+, this may change, but for now classes are required.
// ============================================================================

"use client";

import { Component, type ReactNode, type ErrorInfo } from "react";
import { Button } from "./Button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode; // Optional custom error UI
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    // Start with no error
    this.state = { hasError: false, error: null };
  }

  // React calls this when a child component throws an error
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  // React calls this with error details (for logging)
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    // In production, you'd send this to Sentry or your error tracker
  }

  render() {
    if (this.state.hasError) {
      // If a custom fallback was provided, show that
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 p-8">
          <div className="rounded-full bg-destructive/10 p-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-xl font-semibold">Something went wrong</h2>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <Button
            variant="primary"
            onClick={() => {
              // Reset the error state - this re-renders the children
              this.setState({ hasError: false, error: null });
            }}
          >
            Try Again
          </Button>
        </div>
      );
    }

    // No error - render children normally
    return this.props.children;
  }
}
