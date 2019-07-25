
declare function debugObjectTable(...logs): void
declare namespace debugObjectTable {
	function primary(...logs): void
	function secondary(...logs): void
	function warning(...logs): void
	function danger(...logs): void
	function highlight(...logs): void
	function temp(...logs): void
	function muted(...logs): void
}