import * as React from 'react'
import { Link } from 'react-router-dom'

import Button from '../components/Button'
import RecentPodcasts from '../components/RecentPodcasts'
import { updateTitle } from '../utils'
import StatsCard from './Stats/StatsCard'

import './styles.scss'

interface IProps {}
interface IState {
    loading?: boolean
    recentPodcasts?: Array<any>
    stats?: {}
}

export default class Landing extends React.Component<IProps, IState> {
    state = {
        loading: true,
        recentPodcasts: [],
        stats: {
            feedCountTotal: '-,---,---',
            feedCount3days: '--,---',
            feedCount10days: '---,---',
            feedCount30days: '---,---',
            feedCount60days: '---,---',
            feedCount90days: '---,---',
        },
    }
    _isMounted = false

    constructor(props: IProps) {
        super(props)
    }

    async componentDidMount(): Promise<void> {
        this._isMounted = true
        const recentPodcasts = (await this.getRecentEpisodes()).items
        const stats = await this.getStats()

        if (this._isMounted) {
            this.setState({
                loading: false,
                recentPodcasts,
                stats,
            })
        }
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    async getStats() {
        let response = await fetch('/api/stats', {
            credentials: 'same-origin',
            method: 'GET',
        })
        return await response.json()
    }

    async getRecentEpisodes() {
        let response = await fetch(`/api/recent/episodes?max=7`, {
            credentials: 'same-origin',
            method: 'GET',
        })
        return await response.json()
    }

    render() {
        const { loading, recentPodcasts, stats } = this.state
        updateTitle('Home')
        return (
            <div className="landing-content">
                <div className="hero-pitch">
                    <div className="hero-pitch-left">
                        <h1 className="hero-pitch-text">
                            The Podcast Index is here to preserve, protect and extend the open,
                            independent podcasting ecosystem.
                        </h1>

                        <div className="hero-pitch-subtitle">
                            We do this by enabling developers to have access to
                            an open, categorized index that will always be
                            available for free, for any use.
                        </div>
                        <div className="hero-pitch-subtitle">
                            Try a <Link to="/apps"><u>new podcast app</u></Link> today and see how much better the experience can be.
                        </div>
                        {/*<div className="listen-row">*/}
                        {/*    <audio controls preload="none">*/}
                        {/*        <source*/}
                        {/*            src="https://mp3s.nashownotes.com/PC20-01-2020-08-28-Final.mp3"*/}
                        {/*            type="audio/mpeg"*/}
                        {/*        />*/}
                        {/*    </audio>*/}
                        {/*    <a*/}
                        {/*        className="subscribe-badge"*/}
                        {/*        title="Subscribe"*/}
                        {/*        target="_blank"*/}
                        {/*        href="http://mp3s.nashownotes.com/pc20rss.xml"*/}
                        {/*    >*/}
                        {/*        <img src={RSSLogo} />*/}
                        {/*    </a>*/}
                        {/*</div>*/}
                    </div>
                    <div className="hero-pitch-right">
                        <RecentPodcasts
                            title="Recent Podcasts"
                            loading={loading}
                            podcasts={recentPodcasts}
                        />
                    </div>
                </div>
                <StatsCard
                    total={stats.feedCountTotal}
                    threedays={stats.feedCount3days}
                    tendays={stats.feedCount10days}
                    lastMonth={stats.feedCount30days}
                    last60={stats.feedCount60days}
                    last90={stats.feedCount90days}
                />
                <div className="info-section">
                    <h3>Promise</h3>
                    <p>
                        The core, categorized index will always be available for
                        free, for any use.
                    </p>
                    <h3>Operations</h3>
                    <p>
                        Podcast Index LLC is a software developer focused
                        partnership that provides tools and data to anyone who
                        aspires to create new and exciting Podcast experiences
                        without the heavy lifting of indexing, aggregation and
                        data management.
                    </p>
                    <h3>Financing</h3>
                    <p>
                        The core Podcast Index is financed by its founders and
                        stakeholders: Podcasters, Developers and Listeners.
                    </p>
                    <p>
                        Corporate interests and advertising are antithetical to
                        our business.
                    </p>
                    <p>
                        Podcast Index LLC strives to grow by providing enhanced
                        API services of value to developers and organizations.
                    </p>
                    <h3>Mission and Goal</h3>
                    <p>Preserve, protect and extend the open, independent podcasting ecosystem.</p>
                    <p>
                        Re-tool podcasting to a platform of value exchange that
                        includes developers with podcasters and listeners.
                    </p>
                    <h3>Developer? Join the fun!</h3>
                    <p>
                        <strong>API Documentation</strong> is <a target="_blank" href="https://podcastindex-org.github.io/docs-api/">online here</a>.
                    </p>
                    <p>
                        <strong>Get API keys</strong> by <a href="https://api.podcastindex.org/signup">signing up for an account</a>
                    </p>
                    <p>
                        <strong>Download the full podcast index</strong> as <a href="https://public.podcastindex.org/podcastindex_feeds.db.tgz">a sqlite3 file</a>.{' '}
                        Query the entire database on your desktop using <a href="https://sqlitebrowser.org">DB Browser for SQLite</a> or similar.{' '}
                        The file is produced Saturdays at 22:00 UTC (and uploaded a few hours later).
                    </p>
                    <p>
                        <strong>We build in the open.</strong> Get active in the{' '}
                        <a href="https://github.com/Podcastindex-org">
                            Github repos
                        </a>
                        .
                    </p>
                    <p>
                        <strong>We have a Mastodon server for collaboration.</strong> Join it
                        here:{' '}
                        <a href="https://podcastindex.social/invite/hfcQYbjq">
                            Podcastindex.social
                        </a>
                    </p>
                    <p>
                        <strong>Follow us</strong> on{' '}
                        <a href="https://x.com/PodcastindexOrg">
                            X - @podcastindexorg
                        </a>
                        {' '} or{' '}
                        <a href="https://podcastindex.social/public/local/">
                            our Mastodon server
                        </a>
                        .
                    </p>
                    <p>
                        <strong>Shoot us an email</strong> at:{' '}
                        <a href="mailto:info@podcastindex.org">
                            info@podcastindex.org
                        </a>
                    </p>
                </div>
                <div id="donate" className="info-section">
                    <h3>Help us out...</h3>
                    <p>
                        <strong>None of this is free.</strong> If you get any value from this
                        project, or if you just believe in it and want to help
                        us out with hosting fees and paying the bills, a
                        donation of any amount would be great.
                    </p>
                    <div className="donation-providers">
                        <div className="paypal">
                            <h4>Paypal</h4>
                            <form
                                action="https://www.paypal.com/cgi-bin/webscr"
                                method="post"
                                target="_top"
                            >
                                <input
                                    type="hidden"
                                    name="cmd"
                                    value="_s-xclick"
                                />
                                <input
                                    type="hidden"
                                    name="hosted_button_id"
                                    value="9GEMYSYB7G2DW"
                                />
                                <Button
                                    big
                                    primary
                                    type="submit"
                                    alt="Donate with PayPal button"
                                >
                                    Donate
                                </Button>
                            </form>
                        </div>
                        {/*<div className="sphinx-chat">*/}
                        {/*    <h4>Sphinx Chat</h4>*/}
                        {/*    <SphinxChat />*/}
                        {/*</div>*/}
                    </div>
                </div>
                {/* <div className="footer">
                    <a className="social-link">
                        <img
                            height={25}
                            width={25}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Mastodon_Logotype_%28Simple%29.svg/223px-Mastodon_Logotype_%28Simple%29.svg.png"
                        />
                    </a>
                    <a href="https://twitter.com/PodcastindexOrg">
                        <img
                            height={25}
                            width={30}
                            src="https://www.creativefreedom.co.uk/wp-content/uploads/2017/06/Twitter-featured.png"
                        />
                    </a>
                </div> */}
            </div>
        )
    }
}
