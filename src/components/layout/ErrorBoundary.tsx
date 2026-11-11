import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Last-resort guard: a thrown render error would otherwise leave a blank dark
 * page with no navigation. The fallback stays inside the visual system and
 * offers a reload plus a plain link home.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled UI error:", error, info.componentStack);
  }

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        role="alert"
        className="flex min-h-[100svh] flex-col justify-center bg-bg px-5 md:px-[5vw]"
      >
        <span className="label">Unexpected error</span>
        <h1 className="mt-6 max-w-2xl text-[clamp(2.2rem,6.5vw,4.6rem)] leading-[0.95] tracking-[-0.04em]">
          This page hit an error.
        </h1>
        <p className="body-lg mt-5 max-w-md">
          Reload to try again. The rest of the portfolio is still available from
          the home page.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={this.handleReload}
            className="rounded-full bg-accent px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#090909] transition-colors duration-300 hover:bg-ink"
          >
            Reload page
          </button>
          <a
            href="/"
            className="rounded-full border border-line px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            Back to home
          </a>
        </div>
      </div>
    );
  }
}
