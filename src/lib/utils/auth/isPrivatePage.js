export async function isPrivatePage(pathname) {
    const privateSegments = ["/dashboard", "settings/profile"]
    return privateSegments.some(segment => pathname === segment || pathname.startsWith(segment + "/"));
  }