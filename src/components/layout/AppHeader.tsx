import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { UserDropdown } from "@/components/ui/dropdown-user";
import { NotificationsDropdown } from "@/components/ui/notifications-dropdown";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Shield, Search, Globe, HelpCircle, Menu, X } from "lucide-react";
import throttle from "lodash/throttle";
import debounce from "lodash/debounce";

interface AppHeaderProps {
  title?: string;
  badge?: { text: string; variant: "verifier" | "institution" | "admin" };
  showSearch?: boolean;
  showUserControls?: boolean;
  userName?: string;
  userEmail?: string;
  userRole?: string;
}

type Category = "All" | "Certificates" | "Users" | "Institutions";

export const AppHeader = ({
  title = "CertifyPro",
  badge,
  showSearch = false,
  showUserControls = false,
  userName,
  userEmail,
  userRole = "verifier",
}: AppHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [category, setCategory] = useState<Category>("All");

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLButtonElement[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Scroll listener
  useEffect(() => {
    const handleScroll = throttle(() => setScrolled(window.scrollY > 10), 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside mobile menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!mobileMenuOpen && !searchResults.length) return;

      if (searchResults.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setHighlightedIndex((prev) => (prev + 1) % searchResults.length);
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setHighlightedIndex((prev) =>
            (prev - 1 + searchResults.length) % searchResults.length
          );
        }
        if (e.key === "Enter") {
          if (searchResults[highlightedIndex]) {
            setSearchTerm(searchResults[highlightedIndex]);
            setSearchResults([]);
          }
        }
      }

      if (mobileMenuOpen) {
        const items = menuItemsRef.current;
        const currentIndex = items.findIndex(
          (el) => el === document.activeElement
        );
        switch (e.key) {
          case "Escape":
            setMobileMenuOpen(false);
            break;
          case "ArrowDown":
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % items.length;
            items[nextIndex]?.focus();
            break;
          case "ArrowUp":
            e.preventDefault();
            const prevIndex = (currentIndex - 1 + items.length) % items.length;
            items[prevIndex]?.focus();
            break;
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen, searchResults, highlightedIndex]);

  // Mock API fetch with category filter
  const fetchSearchResults = useCallback(
    debounce(async (term: string, cat: Category) => {
      if (!term) return setSearchResults([]);
      const mockData = {
        Certificates: ["Certificate A", "Certificate B", "Certificate C"],
        Users: ["John Doe", "Jane Smith", "Alice Johnson"],
        Institutions: ["Institution X", "Institution Y", "Institution Z"],
      };
      let results: string[] = [];
      if (cat === "All") {
        results = Object.values(mockData)
          .flat()
          .filter((item) => item.toLowerCase().includes(term.toLowerCase()));
      } else {
        results = mockData[cat].filter((item) =>
          item.toLowerCase().includes(term.toLowerCase())
        );
      }
      setSearchResults(results);
      setHighlightedIndex(0);
    }, 300),
    []
  );

  useEffect(() => {
    fetchSearchResults(searchTerm, category);
  }, [searchTerm, category, fetchSearchResults]);

  const getBadgeStyles = useCallback((variant: string) => {
    switch (variant) {
      case "verifier":
        return "bg-role-verifier/10 text-role-verifier border-role-verifier";
      case "institution":
        return "bg-role-institution/10 text-role-institution border-role-institution";
      case "admin":
        return "bg-role-admin/10 text-role-admin border-role-admin";
      default:
        return "bg-primary/10 text-primary border-primary";
    }
  }, []);

  const getShieldColor = useCallback(() => {
    if (!badge) return "text-primary";
    switch (badge.variant) {
      case "verifier":
        return "text-role-verifier";
      case "institution":
        return "text-role-institution";
      case "admin":
        return "text-role-admin";
      default:
        return "text-primary";
    }
  }, [badge]);

  const mobileMenuVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    }),
    []
  );

  const menuItemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    }),
    []
  );

  const MenuButton = ({
    icon: Icon,
    label,
    onClick,
    index,
  }: {
    icon: any;
    label?: string;
    onClick?: () => void;
    index?: number;
  }) => (
    <Button
      variant="ghost"
      size="icon"
      className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
      onClick={onClick}
      ref={(el) => index !== undefined && (menuItemsRef.current[index] = el!)}
    >
      <Icon className="h-5 w-5" />
      {label && <span>{label}</span>}
    </Button>
  );

  const renderSearchResults = (isMobile = false) =>
    searchResults.length > 0 && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`absolute z-50 w-full mt-1 bg-background border border-muted-foreground/20 rounded-lg shadow-lg overflow-hidden ${
          isMobile ? "" : "left-0"
        }`}
      >
        {/* Category Tabs */}
        <div className="flex border-b border-muted-foreground/20 bg-background">
          {(["All", "Certificates", "Users", "Institutions"] as Category[]).map(
            (cat) => (
              <button
                key={cat}
                className={`flex-1 px-3 py-1 text-sm font-medium hover:bg-muted-foreground/10 transition-colors ${
                  category === cat ? "border-b-2 border-primary" : ""
                }`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            )
          )}
        </div>

        {/* Results */}
        <ul>
          {searchResults.map((item, idx) => (
            <li
              key={idx}
              className={`px-4 py-2 cursor-pointer hover:bg-primary/10 ${
                highlightedIndex === idx ? "bg-primary/20" : ""
              }`}
              onClick={() => {
                setSearchTerm(item);
                setSearchResults([]);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    );

  return (
    <header
      className={`border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50 transition-shadow ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Logo + Badge */}
        <div className="flex items-center space-x-4 min-w-0">
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className={`${getShieldColor()}`}
              whileHover={{ rotate: 12 }}
              transition={{ duration: 0.3 }}
            >
              <Shield className="h-8 w-8" />
            </motion.div>
            <motion.span
              className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.span>
          </motion.div>
          {badge && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Badge
                variant="outline"
                className={`${getBadgeStyles(
                  badge.variant
                )} transition-all duration-300 hover:scale-105 hover:shadow-md`}
              >
                {badge.text}
              </Badge>
            </motion.div>
          )}
        </div>

        {/* Desktop Search */}
        {showSearch && (
          <div className="flex-1 max-w-md mx-4 hidden sm:block relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                ref={searchInputRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search certificates, users, or institutions..."
                className="pl-10 pr-10 bg-background/50 border-muted-foreground/20 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-shadow duration-300 shadow-sm"
              />
              {renderSearchResults()}
            </div>
          </div>
        )}

        {/* Desktop Controls */}
        <div className="hidden sm:flex items-center space-x-2">
          <MenuButton icon={Globe} />
          <MenuButton icon={HelpCircle} />
          <ThemeToggle />
          {showUserControls ? (
            <>
              <div className="relative">
                <NotificationsDropdown />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
              </div>
              <UserDropdown
                userName={userName}
                userEmail={userEmail}
                userRole={userRole}
              />
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Link to="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="sm:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              ref={mobileMenuRef}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              transition={{ duration: 0.25 }}
              className="sm:hidden fixed top-16 left-0 right-0 px-4 pb-4 bg-background/95 backdrop-blur-md z-50"
            >
              {/* Mobile Search */}
              {showSearch && (
                <div className="my-2 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    autoFocus
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search certificates, users, or institutions..."
                    className="pl-10 pr-10 w-full bg-background/50 border-muted-foreground/20 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-shadow duration-300 shadow-sm"
                  />
                  {renderSearchResults(true)}
                </div>
              )}

              <motion.div
                className="flex flex-col space-y-2 mt-2"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
              >
                {[{ icon: Globe, label: "Change Language" }, { icon: HelpCircle, label: "Help" }].map(
                  (item, index) => (
                    <motion.div key={index} variants={menuItemVariants}>
                      <MenuButton icon={item.icon} label={item.label} index={index} />
                    </motion.div>
                  )
                )}

                <motion.div variants={menuItemVariants}>
                  <ThemeToggle />
                </motion.div>

                {showUserControls ? (
                  <>
                    <motion.div variants={menuItemVariants}>
                      <NotificationsDropdown />
                    </motion.div>
                    <motion.div variants={menuItemVariants}>
                      <UserDropdown
                        userName={userName}
                        userEmail={userEmail}
                        userRole={userRole}
                      />
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div variants={menuItemVariants}>
                      <Button variant="ghost" asChild ref={(el) => (menuItemsRef.current[3] = el!)}>
                        <Link to="/login">Login</Link>
                      </Button>
                    </motion.div>
                    <motion.div variants={menuItemVariants}>
                      <Button
                        asChild
                        className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                        ref={(el) => (menuItemsRef.current[4] = el!)}
                      >
                        <Link to="/signup">Get Started</Link>
                      </Button>
                    </motion.div>
                  </>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
