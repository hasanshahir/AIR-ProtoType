import teamData from '../data/team.json'
import previousInternsData from '../data/previous_interns.json'
import grantsData from '../data/grants.json'
import sponsorsData from '../data/sponsors.json'
import projectsData from '../data/projects.json'
import publicationsData from '../data/publications.json'
import type { Grant, Sponsor, ProjectItem, TeamMemberData, PublicationItem } from '../types/data'

export function getTeamMembers(): TeamMemberData[] {
  return teamData as TeamMemberData[]
}

export function getPreviousInterns(): any[] {
  return previousInternsData
}

export function getGrants(): Grant[] {
  return grantsData as Grant[]
}

export function getActiveGrants(): Grant[] {
  return (grantsData as Grant[]).filter(g => g.status === 'Active')
}

export function getSponsors(): Sponsor[] {
  return sponsorsData as Sponsor[]
}

export function getProjects(): ProjectItem[] {
  return projectsData as ProjectItem[]
}

export function getOngoingProjects(): ProjectItem[] {
  return (projectsData as ProjectItem[]).filter(p => p.status === 'Ongoing')
}

export function getFinishedProjects(): ProjectItem[] {
  return (projectsData as ProjectItem[]).filter(p => p.status === 'Finished')
}

export function getPublications(): PublicationItem[] {
  return (publicationsData as PublicationItem[]).sort((a, b) => b.year - a.year)
}

/**
 * Computes live, dynamic lab statistics directly from datasets
 */
export function getComputedLabStats() {
  const currentMembers = getTeamMembers()
  const alumni = getPreviousInterns()
  const grants = getGrants()
  const publications = getPublications()

  const facultyCount = currentMembers.filter(m => m.category === 'Faculty' || m.isLead).length
  const currentInternCount = currentMembers.filter(m => m.category === 'Research Interns').length
  const totalAlumniCount = alumni.length
  const totalInternsAllTime = currentInternCount + totalAlumniCount
  const totalResearchers = currentMembers.length + totalAlumniCount
  const activeGrantsCount = grants.filter(g => g.status === 'Active').length
  const totalPublications = publications.length

  return {
    facultyCount,
    currentInternCount,
    totalInternsAllTime,
    totalResearchers,
    activeGrantsCount,
    totalPublications,
    statsStrip: [
      {
        value: `${totalResearchers}+`,
        label: 'Total Researchers & Scholars',
        desc: `${facultyCount} Faculty Lead · ${currentInternCount} Active Interns · ${totalAlumniCount} Alumni`,
      },
      {
        value: `${facultyCount}`,
        label: 'Tenured Faculty Coordinators',
        desc: 'PhD Approved Supervisors & Principal Investigators',
      },
      {
        value: `${currentInternCount}`,
        label: 'Current Research Interns',
        desc: `Cohort 2025–2026 (${totalInternsAllTime} total mentored)`,
      },
      {
        value: `${activeGrantsCount}`,
        label: 'Active Grants & Funds',
        desc: 'HEC NRPU, Ignite NCBC, Google & Meta AI',
      },
    ],
  }
}
